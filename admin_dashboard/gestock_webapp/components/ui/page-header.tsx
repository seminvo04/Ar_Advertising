import { PageHeaderProps } from "@/types/ui";

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2.5">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}