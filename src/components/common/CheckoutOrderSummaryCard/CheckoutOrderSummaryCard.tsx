"use client";

import { Card, CardHeader, CardContent, Separator, Typography } from "@/components/ui";
import type { CheckoutOrderSummaryCardProps } from "./CheckoutOrderSummaryCard.types";

export const CheckoutOrderSummaryCard = ({
  productAmount,
  feeAmount,
  totalAmount,
  recipientName,
  recipientAmount,
  savingsMessage = null,
}: CheckoutOrderSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        Resumo do pedido
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <Typography variant="body" as="span">Produto</Typography>
            <Typography variant="body" as="span">{productAmount}</Typography>
          </div>
          <div className="flex justify-between items-baseline">
            <Typography variant="body" as="span">Taxa Cakto</Typography>
            <Typography variant="body" as="span">{feeAmount}</Typography>
          </div>
          <div className="flex justify-between items-baseline">
            <Typography variant="body" as="span" className="font-bold text-gray-900">Total</Typography>
            <Typography variant="body" as="span" className="font-bold text-gray-900">{totalAmount}</Typography>
          </div>
          <Separator />
          <div className="flex justify-between items-baseline">
            <Typography variant="body" as="span" className="font-bold text-green-600">
              {recipientName} recebe
            </Typography>
            <Typography variant="body" as="span" className="font-bold text-green-600">
              {recipientAmount}
            </Typography>
          </div>
          {savingsMessage != null && savingsMessage !== "" && (
          <Typography variant="caption">{savingsMessage}</Typography>
        )}
        </div>
      </CardContent>
    </Card>
  );
};
