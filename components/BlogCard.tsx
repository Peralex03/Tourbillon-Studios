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
    <article className="group bg-white/60 backdrop-blur-md border border-gray-200/70 rounded-2xl p-7 flex flex-col gap-4 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-100/30 transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-400">
          {post.readTime} {minReadLabel}
        </span>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <time className="text-xs text-gray-400">{formatDate(post.date, locale)}</time>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
        >
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}
