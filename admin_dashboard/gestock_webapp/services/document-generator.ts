import { Order } from "@/types/orders";

export async function generateTicketZ(order: Order): Promise<Blob> {
  const response = await fetch(`/api/orders/${order.id}/ticket`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate ticket');
  }
  
  return await response.blob();
}

export async function generateInvoice(order: Order): Promise<Blob> {
  const response = await fetch(`/api/orders/${order.id}/invoice`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate invoice');
  }
  
  return await response.blob();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}