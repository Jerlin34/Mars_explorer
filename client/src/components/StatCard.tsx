import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string | ReactNode;
}

export function StatCard({ icon: Icon, label, value, sublabel }: StatCardProps) {
  return (
    <Card className="p-6 space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      </div>
      
      <div className="space-y-1">
        {value && (
          <p className="text-4xl font-bold text-primary font-mono" data-testid={`stat-${label.toLowerCase().replace(/ /g, '-')}`}>
            {value}
          </p>
        )}
        {sublabel && (
          <div className="text-sm text-muted-foreground">
            {sublabel}
          </div>
        )}
      </div>
    </Card>
  );
}
