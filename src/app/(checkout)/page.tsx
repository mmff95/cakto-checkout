"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Button, Container } from "@/components/ui";
import {
  CheckoutProductCard,
  CheckoutPersonalDataCard,
  CheckoutPaymentCard,
  CheckoutOrderSummaryCard,
} from "@/components/common";
import { checkoutFormSchema, type CheckoutFormValues } from "@/schemas/checkout";
import { PRODUCT_MOCK } from "@/constants/product";
import type { CheckoutOutput, PaymentType } from "@/types/checkout";
import { getDigits } from "@/support/mask";
import {
  getPlatformFee,
  getProducerNet,
  formatBRL,
  type FeePaymentMethod,
} from "@/support/checkout-fees";

const defaultValues: CheckoutFormValues = {
  email: "",
  cpf: "",
  paymentMethod: "pix",
  installments: 1,
};

const CheckoutPage = () => {
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
  });

  const paymentMethod = methods.watch("paymentMethod");
  const installments = methods.watch("installments");
  const productPrice = PRODUCT_MOCK.currentPrice;

  const summary = useMemo(() => {
    const method: FeePaymentMethod = paymentMethod;
    const fee = getPlatformFee(productPrice, method, installments);
    const producerNet = getProducerNet(productPrice, fee);
    const feeIfPix = 0;
    const producerNetIfPix = productPrice;
    const pixSavings = fee > 0 ? producerNetIfPix - producerNet : 0;

    return {
      productAmount: formatBRL(productPrice),
      feeAmount: formatBRL(fee),
      totalAmount: formatBRL(productPrice),
      producerNet,
      fee,
      pixSavings,
    };
  }, [productPrice, paymentMethod, installments]);

  const savingsMessage =
    summary.pixSavings > 0
      ? `Você economiza ${formatBRL(summary.pixSavings)} com PIX`
      : null;

  const handleSubmit = methods.handleSubmit((data: CheckoutFormValues) => {
    const paymentType: PaymentType = data.paymentMethod === "pix" ? "PIX" : "CARD";
    const output: CheckoutOutput = {
      email: data.email,
      cpf: getDigits(data.cpf),
      paymentType,
      ...(data.paymentMethod === "card" && { installments: data.installments }),
    };
    console.log("checkout", output);
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CheckoutProductCard
            title={PRODUCT_MOCK.name}
            originalPrice={formatBRL(PRODUCT_MOCK.originalPrice)}
            price={formatBRL(PRODUCT_MOCK.currentPrice)}
          />
          <CheckoutPersonalDataCard />
          <CheckoutPaymentCard productPrice={productPrice} />
          <CheckoutOrderSummaryCard
            productAmount={summary.productAmount}
            feeAmount={summary.feeAmount}
            totalAmount={summary.totalAmount}
            recipientName={PRODUCT_MOCK.producer}
            recipientAmount={formatBRL(summary.producerNet)}
            savingsMessage={savingsMessage}
          />
          <Button type="submit" fullWidth icon="🚀">
            Finalizar compra
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckoutPage;
