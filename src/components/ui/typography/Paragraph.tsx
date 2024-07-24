import { cn } from "@/lib/utils";
import { ParagraphProps } from "@/types";

export function Paragraph({ className, children, ...props }: ParagraphProps) {
  return (
    <p className={cn("leading-7", className)} {...props}>
      {children}
    </p>
  );
}
