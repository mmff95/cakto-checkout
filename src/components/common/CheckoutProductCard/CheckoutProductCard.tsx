"use client";

import { Card, CardHeader, CardContent, Typography } from "@/components/ui";
import type { CheckoutProductCardProps } from "./CheckoutProductCard.types";

export const CheckoutProductCard = ({
  title,
  originalPrice,
  price,
}: CheckoutProductCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Typography variant="h4">{title}</Typography>
      </CardHeader>
      <CardContent>
        <Typography variant="caption">De {originalPrice}</Typography>
        {" "}
        <Typography variant="caption">por</Typography>
        {" "}
        <Typography variant="body" as="span" className="font-bold text-gray-900">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};
