import { cn } from "@/lib/utils";

interface PlaceholderBlockProps {
  children: React.ReactNode;
  className?: string;
  height?: "sm" | "md" | "lg" | "xl";
}

const heightClasses = {
  sm: "h-24",
  md: "h-32", 
  lg: "h-48",
  xl: "h-64"
};

export const PlaceholderBlock = ({ 
  children, 
  className, 
  height = "md" 
}: PlaceholderBlockProps) => {
  return (
    <div className={cn(
      "placeholder-block flex items-center justify-center",
      heightClasses[height],
      className
    )}>
      <div className="text-sm sm:text-base text-center px-4">
        {children}
      </div>
    </div>
  );
};