import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { LucideIcon, MoreHorizontal } from "lucide-react";

interface Action {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary";
}

interface MetricCardProps {
  title: string;
  value: string;
  product: { id: string; name: string }[];
  icon: LucideIcon;
  actions?: Action[];
}

export function MetricCard({
  title,
  value,
  product,
  // icon: Icon,
  actions = [],
}: MetricCardProps) {
  return (
    <Card className="transition-transform duration-300 hover:scale-105 relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>

        {/* Actions en haut à droite */}
        <div className="flex items-center gap-1">
          {actions.map((action, index) => {
            const ActionIcon = action.icon || MoreHorizontal;
            return (
              <Button
                key={index}
                size="icon"
                variant={action.variant}
                onClick={action.onClick}
                aria-label={action.label}
              >
                <ActionIcon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        {/* Affiche la valeur (prix) */}
        <p className="text-2xl font-bold">{value} FCFA</p>

        {/* Affiche la liste des produits */}
        <div className="mt-2 text-sm text-muted-foreground">
          <strong>Produits :</strong>
          <ul className="list-disc list-inside">
            {product.length > 0 ? (
              product.map((prod) => (
                <li key={prod.id}>{prod.name}</li>
              ))
            ) : (
              <li>Aucun produit</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
