import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4 w-3/4",
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-zinc-800/80 block",
        variantClasses[variant],
        className
      )} 
      {...props}
    >
      {/* Enhanced shimmer effect with more visible gradient */}
      <div 
        className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent"
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-48 w-full" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return (
    <Skeleton 
      variant="circular" 
      className={cn("h-12 w-12", className)} 
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full"
          )} 
        />
      ))}
    </div>
  );
}
