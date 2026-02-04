export type PaymentType = "PIX" | "CARD";

export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  currentPrice: number;
  producer: string;
  format: string;
  deliveryTime: string;
}

export interface CheckoutOutput {
  email: string;
  cpf: string;
  paymentType: PaymentType;
  installments?: number;
}
