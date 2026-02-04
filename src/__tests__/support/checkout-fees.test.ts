import {
  getPlatformFeeRate,
  getPlatformFee,
  getProducerNet,
  formatBRL,
} from "@/support/checkout-fees";

describe("checkout-fees", () => {
  describe("getPlatformFeeRate", () => {
    it("returns 0 for PIX", () => {
      expect(getPlatformFeeRate("pix", 1)).toBe(0);
    });

    it("returns 3.99% for card 1x", () => {
      expect(getPlatformFeeRate("card", 1)).toBe(0.0399);
    });

    it("returns correct rate for card 2x (4.99% + 2%)", () => {
      expect(getPlatformFeeRate("card", 2)).toBeCloseTo(0.0699);
    });

    it("returns correct rate for card 12x", () => {
      expect(getPlatformFeeRate("card", 12)).toBeCloseTo((4.99 + 22) / 100);
    });
  });

  describe("getPlatformFee", () => {
    it("returns 0 for PIX", () => {
      expect(getPlatformFee(100, "pix", 1)).toBe(0);
    });

    it("calculates fee for card 1x", () => {
      expect(getPlatformFee(100, "card", 1)).toBe(3.99);
    });

    it("rounds fee to 2 decimals", () => {
      expect(getPlatformFee(33.33, "card", 1)).toBe(1.33);
    });
  });

  describe("getProducerNet", () => {
    it("subtracts fee from price", () => {
      expect(getProducerNet(100, 3.99)).toBe(96.01);
    });

    it("rounds to 2 decimals", () => {
      expect(getProducerNet(10.55, 0.42)).toBe(10.13);
    });
  });

  describe("formatBRL", () => {
    it("formats with R$ and comma decimal", () => {
      expect(formatBRL(10.5)).toBe("R$ 10,50");
    });

    it("formats integers with ,00", () => {
      expect(formatBRL(100)).toBe("R$ 100,00");
    });
  });
});
