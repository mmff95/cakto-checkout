import { checkoutFormSchema } from "@/schemas/checkout";

describe("checkoutFormSchema", () => {
  const validBase = {
    email: "user@example.com",
    cpf: "",
    paymentMethod: "pix" as const,
    installments: 1,
  };

  it("accepts valid PIX payload", () => {
    const result = checkoutFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("accepts valid CPF with 11 digits", () => {
    const result = checkoutFormSchema.safeParse({
      ...validBase,
      cpf: "123.456.789-00",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = checkoutFormSchema.safeParse({
      ...validBase,
      email: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "E-mail é obrigatório")).toBe(true);
    }
  });

  it("rejects invalid email", () => {
    const result = checkoutFormSchema.safeParse({
      ...validBase,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "E-mail inválido")).toBe(true);
    }
  });

  it("rejects CPF with wrong digit count", () => {
    const result = checkoutFormSchema.safeParse({
      ...validBase,
      cpf: "123.456.789-0",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "CPF deve ter 11 dígitos")).toBe(true);
    }
  });

  it("accepts valid card with installments", () => {
    const result = checkoutFormSchema.safeParse({
      ...validBase,
      paymentMethod: "card",
      installments: 3,
    });
    expect(result.success).toBe(true);
  });
});
