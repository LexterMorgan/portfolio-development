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

function ButtonLabel({
  children,
  arrow,
}: {
  children: React.ReactNode;
  arrow?: boolean;
}) {
  return (
    <>
      <span>{children}</span>
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
      variant = "primary",
      size = "md",
      className,
    } = props;
    const classes = buttonClasses(variant, size, className);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonLabel arrow={arrow}>{children}</ButtonLabel>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
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
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <ButtonLabel arrow={arrow}>{children}</ButtonLabel>
    </button>
  );
}
