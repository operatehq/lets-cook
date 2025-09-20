import { forwardRef } from "react";
import { cva, type VariantProps } from "../lib/cva.config";

const labelVariants = cva({
  base: "block text-sm font-semibold mb-2 text-foreground/80",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "semibold",
  },
});

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, weight, required, children, ...props }, ref) => {
    return (
      <label
        className={`${labelVariants({ size, weight })} ${className || ""}`}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  },
);

Label.displayName = "Label";

export { Label, labelVariants };
