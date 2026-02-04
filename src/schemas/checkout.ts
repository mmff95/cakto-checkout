import { z } from "zod";
import { getDigits } from "@/support/mask";

const cpfValid = (val: string) => {
  const digits = getDigits(val);
  return digits.length === 0 || digits.length === 11;
};

export const checkoutFormSchema = z
  .object({
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    cpf: z.string().refine(cpfValid, "CPF deve ter 11 dígitos"),
    paymentMethod: z.enum(["pix", "card"]),
    installments: z.number().min(1).max(12),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "pix") return true;
      return data.installments >= 1 && data.installments <= 12;
    },
    { message: "Selecione o número de parcelas", path: ["installments"] }
  );

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
