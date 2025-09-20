import { forwardRef } from "react";
import { cva, type VariantProps } from "../lib/cva.config";

const inputVariants = cva({
  base: "w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground transition-colors",
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3",
      lg: "px-4 py-4 text-lg",
    },
    variant: {
      default: "bg-white/5 border-white/5 hover:border-white/10",
      ghost:
        "bg-transparent hover:bg-white/5 border-transparent hover:border-white/10",
      filled:
        "bg-white/20 border-white/20 hover:bg-white/30 hover:border-white/30",
    },
    state: {
      default: "",
      error: "border-red-500 focus:ring-red-500",
      success: "border-green-500 focus:ring-green-500",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    state: "default",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, state, error, ...props }, ref) => {
    const computedState = error ? "error" : state;

    return (
      <input
        className={`${inputVariants({
          size,
          variant,
          state: computedState,
        })} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
