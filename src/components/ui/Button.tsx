import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
type ButtonSize = "sm" | "md";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  arrow?: boolean;
  /** Native file download. Pass a filename to set the saved name. */
  download?: string | boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
}

function DownloadGlyph() {
  return (
    <svg
      className={styles.downloadIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function ButtonLabel({
  children,
  arrow,
  downloadIcon,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  downloadIcon?: boolean;
}) {
  return (
    <>
      <span>{children}</span>
      {downloadIcon ? <DownloadGlyph /> : null}
      {arrow ? (
        <span aria-hidden className={styles.arrow}>
          →
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  if ("href" in props) {
    const {
      children,
      href,
      external,
      arrow,
      download,
      variant = "primary",
      size = "md",
      className,
    } = props;
    const classes = buttonClasses(variant, size, className);
    if (download) {
      return (
        <a
          href={href}
          className={classes}
          download={typeof download === "string" ? download : true}
          data-cursor="hot"
        >
          <ButtonLabel downloadIcon>{children}</ButtonLabel>
        </a>
      );
    }
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hot"
        >
          <ButtonLabel arrow={arrow}>{children}</ButtonLabel>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} data-cursor="hot">
        <ButtonLabel arrow={arrow}>{children}</ButtonLabel>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const {
    children,
    arrow,
    variant = "primary",
    size = "md",
    className,
    type = "button",
    ...rest
  } = buttonProps;

  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...rest}
      data-cursor="hot"
    >
      <ButtonLabel arrow={arrow}>{children}</ButtonLabel>
    </button>
  );
}
