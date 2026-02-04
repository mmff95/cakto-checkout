export interface CheckoutOrderSummaryCardProps {
  productAmount: string;
  feeAmount: string;
  totalAmount: string;
  recipientName: string;
  recipientAmount: string;
  savingsMessage?: string | null;
}
