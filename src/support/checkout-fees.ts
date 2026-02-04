/** Payment method for fee calculation. */
export type FeePaymentMethod = "pix" | "card";

/** PIX: 0%. Card 1x: 3.99%. Card 2x-12x: 4.99% + 2% per extra installment (2x=+2%, 3x=+4%, ..., 12x=+22%). */
export const getPlatformFeeRate = (
  method: FeePaymentMethod,
  installments: number
): number => {
  if (method === "pix") return 0;
  if (installments === 1) return 0.0399;
  return (4.99 + (installments - 1) * 2) / 100;
};

/** Platform fee in R$ (paid by producer from product price). */
export const getPlatformFee = (
  productPrice: number,
  method: FeePaymentMethod,
  installments: number
): number => {
  const rate = getPlatformFeeRate(method, installments);
  return Math.round(productPrice * rate * 100) / 100;
};

/** Producer net value (product price minus platform fee). */
export const getProducerNet = (productPrice: number, fee: number): number => {
  return Math.round((productPrice - fee) * 100) / 100;
};

/** Format number as BRL. */
export const formatBRL = (value: number): string => {
  return "R$ " + value.toFixed(2).replace(".", ",");
};
