"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Card, CardHeader, CardContent, Input } from "@/components/ui";
import type { CheckoutFormValues } from "@/schemas/checkout";

export const CheckoutPersonalDataCard = () => {
  const { control, formState } = useFormContext<CheckoutFormValues>();
  const { errors } = formState;

  return (
    <Card>
      <CardHeader>
        Dados pessoais
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="E-mail"
              type="email"
              {...field}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <Input
              label="CPF"
              type="text"
              mask="000.000.000-00"
              {...field}
              error={!!errors.cpf}
              errorMessage={errors.cpf?.message}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
