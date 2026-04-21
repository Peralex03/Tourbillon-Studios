#!/usr/bin/env npx tsx
/**
 * Article generator for Tourbillon Studios blog
 * Usage: npx tsx scripts/generate-article.ts "votre sujet ou mot-clé"
 *
 * Requires: ANTHROPIC_API_KEY env variable
 * Output: BlogPost TypeScript object ready to paste into lib/blog.ts
 */

import Anthropic from "@anthropic-ai/sdk";

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
2. **Semantic field**: Distribute related keywords naturally (don't stuff). Use synonyms and contextual terms.
3. **Optimal length**: 800-1400 words. Long enough to rank, short enough to be read.
4. **Internal linking intent**: Write content that naturally references other blog topics (site vitrine, e-commerce, SEO, web app, agence web Genève).
5. **Long-tail focus**: Target 2-4 word phrases with clear search intent (informational, commercial, navigational).
6. **E-E-A-T signals**: Experience (real examples), Expertise (technical depth), Authoritativeness (data), Trustworthiness (Swiss precision).

## Content rules
- Language: French (fr-CH, formal but accessible)
- Tone: Expert, direct, Swiss precision — no marketing fluff, no generic advice
- Always include at least 2 statistics with named sources
- Always include at least 1 blockquote with a citable fact
- Mention Tourbillon Studios naturally in context (not as advertising)
- Link intent to Swiss market: CHF pricing, Swiss business culture, Swiss cities
- Categories (pick the most relevant): "SEO & Visibilité", "Stratégie digitale", "Conseil", "À propos", "E-commerce", "Développement web"
- ReadTime: estimate at 200 words per minute

## Output format
Return ONLY a valid JSON object matching this TypeScript interface exactly:
{
  "slug": "kebab-case-unique-slug-fr",
  "title": "Title under 80 chars, includes primary keyword",
  "excerpt": "Meta description 140-160 chars, includes keyword, compelling",
  "category": "One of the allowed categories",
  "date": "YYYY-MM-DD",
  "readTime": number,
  "locale": "fr",
  "content": [
    { "type": "p", "text": "..." },
    { "type": "h2", "text": "Question-format heading..." },
    { "type": "p", "text": "..." },
    { "type": "ul", "items": ["item1", "item2", "item3"] },
    { "type": "blockquote", "text": "Statistic or citable fact with source..." },
    { "type": "h3", "text": "Sub-section..." }
  ]
}

Allowed section types: "h2", "h3", "p", "ul", "blockquote"
- "h2" and "h3": { type, text }
- "p": { type, text }
- "ul": { type, items: string[] }
- "blockquote": { type, text }

Do NOT include markdown, code fences, or any text outside the JSON object.`;

async function generateArticle(topic: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  console.error(`\n🔄 Generating article for: "${topic}"`);
  console.error(`📅 Date: ${today}`);
  console.error(`🤖 Model: claude-opus-4-7 with adaptive thinking\n`);

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

Today's date for the article: ${today}

Requirements:
- Primary keyword derived from the topic, naturally integrated
- Target audience: Swiss French-speaking businesses (PME, startups, entrepreneurs)
- Include at least 2 named statistics relevant to the Swiss or European digital market
- Include exactly 1 blockquote with a citable fact or statistic
- 6 to 9 content sections total (mix of h2, p, ul, blockquote, optionally h3)
- Last H2 before conclusion: FAQ format with 2-3 common questions answered inline
- Natural mention of Tourbillon Studios' services where contextually relevant
- End with a strong conclusion paragraph that reinforces the main message

Return only the JSON object.`,
      },
    ],
  });

  process.stderr.write("💭 Thinking");
  let thinkingDots = 0;

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullResponse += event.delta.text;
      if (thinkingDots === 0) {
        process.stderr.write("\n✍️  Writing");
      }
      thinkingDots++;
      if (thinkingDots % 20 === 0) process.stderr.write(".");
    } else if (event.type === "content_block_start") {
      if (event.content_block.type === "thinking") {
        process.stderr.write(".");
      }
    }
  }

  process.stderr.write("\n\n");

  // Clean up potential markdown fences
  const cleaned = fullResponse
    .replace(/^```(?:json)?\n?/m, "")
    .replace(/\n?```$/m, "")
    .trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    console.error("❌ Failed to parse JSON. Raw output:\n");
    console.error(cleaned);
    process.exit(1);
  }

  // Validate required fields
  const required = ["slug", "title", "excerpt", "category", "date", "readTime", "locale", "content"];
  const missing = required.filter((k) => !(k in parsed));
  if (missing.length > 0) {
    console.error(`❌ Missing fields: ${missing.join(", ")}`);
    process.exit(1);
  }

  const usage = await stream.finalMessage();
  console.error(`✅ Done!`);
  console.error(`📊 Tokens — input: ${usage.usage.input_tokens}, output: ${usage.usage.output_tokens}`);
  console.error(`🔗 Slug: ${parsed.slug}`);
  console.error(`📰 Title: ${parsed.title}`);
  console.error(`\n${"─".repeat(60)}`);
  console.error(`Paste the following into lib/blog.ts inside the posts array:`);
  console.error(`${"─".repeat(60)}\n`);

  // Output the TypeScript object (not JSON) to stdout
  console.log(JSON.stringify(parsed, null, 2) + ",");
}

const topic = process.argv.slice(2).join(" ").trim();
if (!topic) {
  console.error("Usage: npx tsx scripts/generate-article.ts \"votre sujet\"");
  console.error('Example: npx tsx scripts/generate-article.ts "création site web Lausanne tarifs"');
  process.exit(1);
}

generateArticle(topic).catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
