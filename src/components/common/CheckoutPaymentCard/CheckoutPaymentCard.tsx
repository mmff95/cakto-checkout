"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Card, CardHeader, CardContent, Radius, Typography } from "@/components/ui";
import type { CheckoutFormValues } from "@/schemas/checkout";
import type { CheckoutPaymentCardProps } from "./CheckoutPaymentCard.types";

const selectedClassName = "border-2 border-green-500 bg-green-50/80 p-3";
const unselectedClassName = "border border-transparent p-3";

const formatBRL = (value: number) => "R$ " + value.toFixed(2).replace(".", ",");

export const CheckoutPaymentCard = ({ productPrice }: CheckoutPaymentCardProps) => {
  const { control, watch } = useFormContext<CheckoutFormValues>();
  const paymentMethod = watch("paymentMethod");

  return (
    <Card>
      <CardHeader>
        <Typography variant="h6" className="text-primary">
          Pagamento
        </Typography>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="cursor-pointer block">
                <Radius
                  variant="inner"
                  className={field.value === "pix" ? selectedClassName : unselectedClassName}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="pix"
                      checked={field.value === "pix"}
                      onChange={() => field.onChange("pix")}
                      onBlur={field.onBlur}
                      className="h-4 w-4 accent-primary"
                    />
                    <Typography variant="body" as="span" className="text-gray-900">
                      PIX (Taxa 0% 🔥)
                    </Typography>
                  </div>
                </Radius>
              </label>
              <label className="cursor-pointer block">
                <Radius
                  variant="inner"
                  className={field.value === "card" ? selectedClassName : unselectedClassName}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="card"
                      checked={field.value === "card"}
                      onChange={() => field.onChange("card")}
                      onBlur={field.onBlur}
                      className="h-4 w-4 accent-primary"
                    />
                    <Typography variant="body" as="span" className="text-gray-900">
                      Cartão
                    </Typography>
                  </div>
                </Radius>
              </label>
            </div>
          )}
        />
        {paymentMethod === "card" && (
          <Controller
            name="installments"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="installments" className="text-sm font-medium text-gray-600">
                  Parcelas
                </label>
                <select
                  id="installments"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}x de {formatBRL(productPrice / n)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};
