/** Strips non-digits from a string. */
export const getDigits = (value: string): string => {
  return value.replace(/\D/g, "");
};

/** Returns how many digit slots ("0") a pattern has. */
export const getMaskMaxLength = (pattern: string): number => {
  return (pattern.match(/0/g) ?? []).length;
};

/** Formats digits into a pattern; stops when digits run out (partial input ok). */
export const applyMask = (digits: string, pattern: string): string => {
  const maxDigits = getMaskMaxLength(pattern);
  const limited = digits.slice(0, maxDigits);
  let d = 0;
  let result = "";
  for (const c of pattern) {
    if (c === "0") {
      if (d < limited.length) {
        result += limited[d++];
      } else {
        break;
      }
    } else {
      result += c;
    }
  }
  return result;
};

/** How many digits appear before this position in the masked string. */
export const getDigitIndexBeforeCursor = (masked: string, cursorPos: number): number => {
  let n = 0;
  for (let i = 0; i < cursorPos && i < masked.length; i++) {
    if (/\d/.test(masked[i])) n++;
  }
  return n;
};

/** Position in masked string where digit count reaches this index (for setting cursor). */
export const getCursorPositionForDigitIndex = (masked: string, digitIndex: number): number => {
  let n = 0;
  for (let i = 0; i < masked.length; i++) {
    if (n === digitIndex) return i;
    if (/\d/.test(masked[i])) n++;
  }
  return masked.length;
};
