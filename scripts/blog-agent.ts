#!/usr/bin/env npx tsx
/**
 * Tourbillon Studios — Blog Automation Agent
 *
 * Reads scripts/topics.json, generates the next pending article via Claude,
 * appends it to lib/blog.ts, marks the topic as done, then commits + pushes.
 *
 * Usage:
 *   npx tsx scripts/blog-agent.ts            → generate 1 article
 *   npx tsx scripts/blog-agent.ts --count 3  → generate up to 3 articles
 *   npx tsx scripts/blog-agent.ts --dry-run  → generate without writing/pushing
 *
 * Requires: ANTHROPIC_API_KEY env variable
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const TOPICS_PATH = resolve(__dirname, "topics.json");
const BLOG_PATH = resolve(ROOT, "lib/blog.ts");

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an expert content strategist and SEO/GEO writer for Tourbillon Studios, a Swiss web agency based in Geneva, Lausanne, and Zürich. Your articles are written in French and published on tourbillonstudios.ch.

## GEO (Generative Engine Optimization) — TOP PRIORITY
GEO is about being cited by AI engines (ChatGPT, Perplexity, Google AI Overviews, Gemini). These are now the rules:

1. **Direct answers first**: Open every H2 with a direct, citable answer (1-2 sentences). AI models extract these as snippets.
2. **Question-format headings**: Use "Pourquoi...", "Comment...", "Qu'est-ce que...", "Quel est..." — these match conversational queries.
3. **Factual density**: Include specific statistics, numbers, percentages, and sources (name the source like "selon Google", "selon HubSpot", "selon Deloitte"). AI models heavily weight citable facts.
4. **Entity clarity**: Mention Tourbillon Studios, Geneva, Lausanne, Zürich, Switzerland explicitly. Geographic and brand entities anchor citations.
5. **Authoritative tone**: Write as an expert sharing original insight, not as a blog post. No filler. Every paragraph must add value.
6. **FAQ structure**: The last section before conclusion should answer 2-3 common questions about the topic (boosts voice search and AI answers).
7. **Structured lists**: Use bullet lists for steps, comparisons, and criteria — AI models extract these as structured answers.
8. **Swiss market specificity**: Always tie content to Swiss context (CHF prices, Swiss regulations like nLPD, Swiss cities, Swiss market data). This creates unique, citable local content.

## SEO (Search Engine Optimization) — SECOND PRIORITY
1. **Primary keyword**: Include the main keyword in: title (first 60 chars), first paragraph, at least 2 H2s, meta description (excerpt).
2. **Semantic field**: Distribute related keywords naturally. Use synonyms and contextual terms.
3. **Optimal length**: 800-1400 words.
4. **E-E-A-T signals**: Experience (real examples), Expertise (technical depth), Authoritativeness (data), Trustworthiness (Swiss precision).

## Content rules
- Language: French (fr-CH, formal but accessible)
- Tone: Expert, direct, Swiss precision — no marketing fluff
- Always include at least 2 statistics with named sources
- Always include exactly 1 blockquote with a citable fact or statistic
- 6 to 9 content sections total (mix of h2, p, ul, blockquote, optionally h3)
- Last H2 before conclusion: FAQ format answering 2-3 common questions inline
- Natural mention of Tourbillon Studios where contextually relevant
- End with a strong conclusion paragraph
- Categories: "SEO & Visibilité", "Stratégie digitale", "Conseil", "À propos", "E-commerce", "Développement web"

## Output format — CRITICAL
Return ONLY a valid JSON object. No markdown fences, no explanation, no text before or after.

{
  "slug": "kebab-case-unique-slug-fr",
  "title": "Title under 80 chars",
  "excerpt": "Meta description 140-160 chars with keyword",
  "category": "One of the allowed categories",
  "date": "YYYY-MM-DD",
  "readTime": number,
  "locale": "fr",
  "content": [
    { "type": "p", "text": "..." },
    { "type": "h2", "text": "..." },
    { "type": "ul", "items": ["...", "..."] },
    { "type": "blockquote", "text": "..." }
  ]
}

Allowed types: "h2", "h3", "p", "ul", "blockquote"`;

interface Topic {
  topic: string;
  status: "pending" | "done" | "error";
  slug?: string;
  generatedAt?: string;
  error?: string;
}

interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "blockquote";
  text?: string;
  items?: string[];
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  locale: string;
  content: BlogSection[];
}

function loadTopics(): Topic[] {
  return JSON.parse(readFileSync(TOPICS_PATH, "utf8"));
}

function saveTopics(topics: Topic[]): void {
  writeFileSync(TOPICS_PATH, JSON.stringify(topics, null, 2) + "\n");
}

function appendToBlog(post: BlogPost): void {
  const content = readFileSync(BLOG_PATH, "utf8");
  const insertionPoint = content.lastIndexOf("];\n\nexport function getAllPosts");
  if (insertionPoint === -1) {
    throw new Error("Could not find insertion point in lib/blog.ts");
  }

  const serialized = JSON.stringify(post, null, 2)
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  const before = content.slice(0, insertionPoint);
  const after = content.slice(insertionPoint);

  const updated = before + serialized + ",\n" + after;
  writeFileSync(BLOG_PATH, updated);
}

function gitCommitAndPush(post: BlogPost): void {
  try {
    execSync(`git -C "${ROOT}" add lib/blog.ts scripts/topics.json`, { stdio: "pipe" });
    execSync(
      `git -C "${ROOT}" commit -m "blog: add article '${post.title.slice(0, 60)}'"`,
      { stdio: "pipe" }
    );
    execSync(`git -C "${ROOT}" push origin main`, { stdio: "pipe" });
    console.error("✅ Committed and pushed to GitHub");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("⚠️  Git push failed (will retry next run):", msg);
  }
}

async function generateArticle(topic: string): Promise<BlogPost> {
  const today = new Date().toISOString().split("T")[0];
  let fullResponse = "";

  const stream = await client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Write a high-quality GEO+SEO optimized blog article for Tourbillon Studios about this topic: "${topic}"

Today's date: ${today}

Requirements:
- Primary keyword derived from the topic, naturally integrated
- Target: Swiss French-speaking businesses (PME, startups, entrepreneurs)
- At least 2 named statistics relevant to Swiss or European digital market
- Exactly 1 blockquote with a citable fact or statistic
- 6 to 9 content sections
- Last H2 before conclusion: FAQ with 2-3 questions answered inline
- Natural mention of Tourbillon Studios where relevant
- Strong conclusion paragraph

Return ONLY the JSON object, nothing else.`,
      },
    ],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullResponse += event.delta.text;
    }
  }

  const cleaned = fullResponse
    .replace(/^```(?:json)?\n?/m, "")
    .replace(/\n?```$/m, "")
    .trim();

  return JSON.parse(cleaned) as BlogPost;
}

async function run(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const countArg = args.indexOf("--count");
  const maxCount = countArg !== -1 ? parseInt(args[countArg + 1] ?? "1") : 1;

  const topics = loadTopics();
  const pending = topics.filter((t) => t.status === "pending");

  if (pending.length === 0) {
    console.error("✅ No pending topics. Add more to scripts/topics.json.");
    return;
  }

  const toProcess = pending.slice(0, maxCount);
  console.error(`\n🤖 Tourbillon Blog Agent`);
  console.error(`📋 Pending topics: ${pending.length}`);
  console.error(`🔄 Generating: ${toProcess.length} article(s)`);
  if (dryRun) console.error(`🧪 DRY RUN — no writes or pushes\n`);

  for (const item of toProcess) {
    console.error(`\n${"─".repeat(60)}`);
    console.error(`📝 Topic: ${item.topic}`);

    const topicIndex = topics.indexOf(item);

    try {
      const post = await generateArticle(item.topic);

      console.error(`✅ Generated: "${post.title}"`);
      console.error(`🔗 Slug: ${post.slug}`);

      if (!dryRun) {
        appendToBlog(post);
        console.error(`📎 Appended to lib/blog.ts`);

        topics[topicIndex] = {
          ...item,
          status: "done",
          slug: post.slug,
          generatedAt: new Date().toISOString(),
        };
        saveTopics(topics);

        gitCommitAndPush(post);
      } else {
        console.error(`[DRY RUN] Would append slug: ${post.slug}`);
        console.error(JSON.stringify(post, null, 2));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ Error: ${msg}`);
      topics[topicIndex] = {
        ...item,
        status: "error",
        error: msg,
      };
      if (!dryRun) saveTopics(topics);
    }
  }

  const remaining = topics.filter((t) => t.status === "pending").length;
  console.error(`\n${"─".repeat(60)}`);
  console.error(`✅ Done. Remaining pending topics: ${remaining}`);
}

run().catch((err) => {
  console.error("❌ Fatal:", err.message);
  process.exit(1);
});
