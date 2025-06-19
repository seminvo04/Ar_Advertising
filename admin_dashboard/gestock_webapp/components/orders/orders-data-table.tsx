"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderDetails } from "./order-details";
import { formatWithOptions } from "date-fns/fp";
import apiService from "@/features";
import { getRestaurantId } from "@/features/Products/product.service";

// Type adapté
type Item = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

type Order = {
  id: string;
  orderNumber: string;
  items: Item[];
  total: number;
  status: "PAID" | "UNPAID";
  waiterId: string;
  waiterName: string;
  createdAt: Date;
  orderType: "INTERNAL" | "EVENT";
};

export function OrdersDataTable() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const restaurantId = await getRestaurantId();
        if (!restaurantId) {
          console.error("Restaurant ID non disponible");
          return;
        }

        const response = await apiService.get<{ data: any }>(
          `/restaurant/${restaurantId}/commandes/list`
        );
        const commandes = response.data.commandes;

        const mapped: Order[] = commandes.map((cmd: any) => {
          const total = parseFloat(cmd.total_amount);
          const paniers = cmd.paniers || [];
          const items: Item[] = paniers.map((p: any) => ({
            id: p.id,
            productId: p.produit.id,
            productName: p.produit.name,
            quantity: p.quantity,
            unitPrice: parseFloat(p.produit.cout_vente),
            subtotal: parseFloat(p.produit.cout_vente) * p.quantity,
          }));

          return {
            id: cmd.id,
            orderNumber: cmd.id.slice(0, 8), // ou autre logique
            items,
            total,
            status: cmd.transaction || cmd.is_validated ? "PAID" : "UNPAID",
            waiterId: cmd.marchand.id,
            waiterName: `${cmd.marchand.user.first_name} ${cmd.marchand.user.last_name}`,
            createdAt: new Date(cmd.created_at),
            orderType: "INTERNAL", // changer si tu as l’info
          };
        });

        setOrders(mapped);
      } catch (err) {
        console.error("Erreur fetch commandes :", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderNumber",
      header: "N° Commande",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => `${row.original.total.toLocaleString()} FCFA`,
    },
    {
      accessorKey: "waiterName",
      header: "Serveur",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "PAID" ? "secondary" : "destructive"}>
          {row.original.status === "PAID" ? "Payée" : "Non payée"}
        </Badge>
      ),
    },
    {
      accessorKey: "orderType",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.orderType === "INTERNAL" ? "Vente interne" : "Événement"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => formatWithOptions({ locale: fr })("Pp", row.original.createdAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(row.original)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="table-container md:w-[80%] mx-auto">
        <DataTable
          columns={columns}
          data={orders}
          isLoading={isLoading}
          filters={[
            {
              id: "status",
              label: "Statut",
              type: "select",
              options: [
                { label: "Payée", value: "PAID" },
                { label: "Non payée", value: "UNPAID" },
              ],
            },
            {
              id: "orderType",
              label: "Type",
              type: "select",
              options: [
                { label: "Vente interne", value: "INTERNAL" },
                { label: "Événement", value: "EVENT" },
              ],
            },
          ]}
        />
      </div>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
}
