import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatWithOptions } from "date-fns/fp";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/orders";
import { Printer, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { generateTicketZ, downloadBlob, generateInvoice } from "@/services/document-generator";
import { toast } from "sonner";

interface OrderDetailsProps {
    order: Order;
    onClose: () => void;
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
    const handleGenerateTicket = async () => {
        try {
            const blob = await generateTicketZ(order);
            downloadBlob(blob, `ticket-${order.orderNumber}.pdf`);
            toast.success("Ticket Z généré avec succès");
          } catch (error) {
            console.error("Error generating ticket:", error);
            toast.error("Erreur lors de la génération du ticket");
          }
    };

    const handleGenerateInvoice = async () => {
        try {
            const blob = await generateInvoice(order);
            downloadBlob(blob, `facture-${order.orderNumber}.pdf`);
            toast.success("Facture générée avec succès");
          } catch (error) {
            console.error("Error generating invoice:", error);
            toast.error("Erreur lors de la génération de la facture");
          }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Détails de la commande #{order.orderNumber}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Informations générales</h3>
                            <div className="mt-2 space-y-1">
                                <p>Date: {formatWithOptions({ locale: fr }, "Pp")(new Date(order.createdAt))}</p>
                                <p>Serveur: {order.waiterName}</p>
                                <p>Type: {order.orderType === "INTERNAL" ? "Vente interne" : "Événement"}</p>
                                {order.eventName && <p>Événement: {order.eventName}</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">Paiement</h3>
                            <div className="mt-2 space-y-1">
                                <p>
                                    Statut:{" "}
                                    <Badge variant={order.status === "PAID" ? "secondary" : "destructive"}>
                                        {order.status === "PAID" ? "Payée" : "Non payée"}
                                    </Badge>
                                </p>
                                {order.paymentMethod && <p>Mode: {order.paymentMethod}</p>}
                                {order.paidAt && (
                                    <p>
                                        Date de paiement: {formatWithOptions({ locale: fr }, "Pp")(new Date(order.paidAt))}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Articles</h3>
                        <div className="border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Produit
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Quantité
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Prix unitaire
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Sous-total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.unitPrice.toLocaleString()} FCFA
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.subtotal.toLocaleString()} FCFA
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-right font-semibold">
                                            Total:
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                                            {order.total.toLocaleString()} FCFA
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex justify-end space-x-2 mt-6">
                    <Button
                        variant="outline"
                        onClick={handleGenerateTicket}
                        className="flex items-center gap-2"
                    >
                        <Printer className="h-4 w-4" />
                        Ticket Z
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleGenerateInvoice}
                        className="flex items-center gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        Facture
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}