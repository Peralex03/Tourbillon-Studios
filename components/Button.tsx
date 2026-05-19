import { Link } from "@/i18n/navigation";
import type { ReactNode, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "phone" | "none";
  className?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonAsButton extends BaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: ComponentProps<"button">["type"];
  disabled?: boolean;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const BASE = "inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] disabled:opacity-60",
  secondary:
    "glass-subtle text-[var(--text)] hover:border-[var(--accent)] disabled:opacity-60",
  ghost:
    "text-[var(--text)] hover:text-[var(--accent)] disabled:opacity-60",
};

const SIZE: Record<Size, string> = {
  sm: "text-[0.875rem] px-5 py-2.5",
  md: "text-[0.9375rem] px-6 py-3.5",
  lg: "text-[1rem] px-7 py-4",
};

function Icon({ icon }: { icon: "arrow" | "phone" }) {
  if (icon === "phone") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon = "arrow",
    className = "",
  } = props;

  const classes = [BASE, VARIANT[variant], SIZE[size], className].join(" ");

  const content = (
    <>
      {children}
      {icon !== "none" && <Icon icon={icon} />}
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
