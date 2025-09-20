import { cva, type VariantProps } from "cva";
import Link from "next/link";
import { forwardRef } from "react";

// Define button variants using CVA beta syntax
const buttonVariants = cva({
  base: "inline-flex gap-2 items-center justify-center px-4 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-semibold",
  variants: {
    variant: {
      default: "bg-white/10 hover:bg-white/20 text-white",
      accent: "bg-accent/90 hover:bg-accent/100 text-white",
      ghost: "hover:bg-white/10 text-white",
      destructive:
        "bg-destructive hover:bg-destructive/90 disabled:bg-gray-400 text-white",
      warning: "bg-warning hover:bg-warning/90 disabled:bg-gray-400 text-white",
      border:
        "border border-white/20 hover:border-white/30 text-foreground/80 hover:text-foreground rounded-lg hover:bg-white/10",
      link: "text-foreground/50 hover:text-foreground transition-opacity",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
      xs: "h-8 px-2 text-xs",
      xl: "h-12 px-6 text-lg",
      square: "h-12 w-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Extract variant props type
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// Base props that work for both button and link
interface BaseButtonProps extends ButtonVariantProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

// Button-specific props
interface ButtonAsButtonProps extends BaseButtonProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Link-specific props
interface ButtonAsLinkProps extends BaseButtonProps {
  as: "link";
  href: string;
  target?: string;
  rel?: string;
}

// Union type for all possible props
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// Polymorphic Button component
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { as = "button", children, className, title, ...restProps } = props;

  // Extract variant and size from props with proper type checking
  const variant = "variant" in props ? props.variant : "default";
  const size = "size" in props ? props.size : "default";

  // Use CVA correctly - pass props object as second argument
  const baseClasses = buttonVariants({
    variant,
    size,
    className,
  });

  if (as === "link") {
    const { href, target, rel, ...linkProps } = restProps as ButtonAsLinkProps;
    return (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        title={title}
        className={baseClasses}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    disabled,
    onClick,
    ...buttonProps
  } = restProps as ButtonAsButtonProps;
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={baseClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
