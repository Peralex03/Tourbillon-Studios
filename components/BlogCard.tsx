import { Link } from "@/i18n/navigation";
import { BlogPost, formatDate } from "@/lib/blog";

interface Props {
  post: BlogPost;
  locale: string;
  readMoreLabel: string;
  minReadLabel: string;
}

export default function BlogCard({ post, locale, readMoreLabel, minReadLabel }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="glass glass-shine h-full p-6 lg:p-7 rounded-lg flex flex-col gap-4 min-h-[260px] hover:border-[var(--accent)] transition-colors">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider px-2.5 py-1 rounded-full glass-subtle text-[var(--accent)]">
            {post.category}
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
            {post.readTime} {minReadLabel}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-[1.125rem] lg:text-[1.25rem] font-medium leading-snug tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2.5">
            {post.title}
          </h2>
          <p className="text-[0.9375rem] text-[var(--text-dim)] leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--stroke)]">
          <time className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
            {formatDate(post.date, locale)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
            {readMoreLabel}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
