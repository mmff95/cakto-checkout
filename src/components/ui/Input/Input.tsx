"use client";

import { useState, useCallback, useRef } from "react";
import {
  applyMask,
  getDigits,
  getDigitIndexBeforeCursor,
  getCursorPositionForDigitIndex,
} from "@/support/mask";
import { inputWrapper, inputLabel, input as inputStyles, inputErrorMessage } from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = ({
  label,
  required = false,
  error = false,
  errorMessage,
  mask,
  className,
  inputClassName,
  id,
  value: valueProp,
  defaultValue,
  onChange,
  ...props
}: InputProps) => {
  const inputId = id ?? "input-" + Math.random().toString(36).slice(2, 9);
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState(() => {
    if (mask == null) return "";
    const initial = (defaultValue as string) ?? valueProp ?? "";
    return applyMask(getDigits(String(initial)), mask);
  });

  const isControlled = valueProp !== undefined;
  const displayValue =
    mask == null
      ? undefined
      : isControlled
        ? applyMask(getDigits(String(valueProp ?? "")), mask)
        : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask == null) {
        onChange?.(e);
        return;
      }
      const digits = getDigits(e.target.value);
      const masked = applyMask(digits, mask);
      if (!isControlled) setInternalValue(masked);
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: masked },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    },
    [mask, isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (mask == null) return;
      const input = e.currentTarget;
      const current = isControlled
        ? applyMask(getDigits(String(valueProp ?? "")), mask)
        : internalValue;
      const digits = getDigits(current);
      const cursorPos = input.selectionStart ?? 0;
      const digitIndex = getDigitIndexBeforeCursor(current, cursorPos);

      if (e.key === "Backspace" && digitIndex > 0 && digits.length > 0) {
        e.preventDefault();
        const newDigits = digits.slice(0, digitIndex - 1) + digits.slice(digitIndex);
        const masked = applyMask(newDigits, mask);
        const newCursor = getCursorPositionForDigitIndex(masked, digitIndex - 1);
        if (!isControlled) setInternalValue(masked);
        const syntheticEvent = {
          ...e,
          target: { ...input, value: masked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
        setTimeout(() => {
          inputRef.current?.setSelectionRange(newCursor, newCursor);
        }, 0);
      } else if (e.key === "Delete" && digitIndex < digits.length) {
        e.preventDefault();
        const newDigits = digits.slice(0, digitIndex) + digits.slice(digitIndex + 1);
        const masked = applyMask(newDigits, mask);
        const newCursor = getCursorPositionForDigitIndex(masked, digitIndex);
        if (!isControlled) setInternalValue(masked);
        const syntheticEvent = {
          ...e,
          target: { ...input, value: masked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
        setTimeout(() => {
          inputRef.current?.setSelectionRange(newCursor, newCursor);
        }, 0);
      }
    },
    [mask, isControlled, onChange, valueProp, internalValue]
  );

  const inputProps = {
    ...props,
    id: inputId,
    required,
    "aria-invalid": error,
    "aria-describedby": error && errorMessage ? inputId + "-error" : undefined,
    className: inputStyles({
      className: label != null ? "pt-3 " + (inputClassName ?? "") : inputClassName,
    }),
    onChange: handleChange,
    ...(mask != null
      ? {
          ref: inputRef,
          value: displayValue,
          onKeyDown: handleKeyDown,
          inputMode: "numeric" as const,
          pattern: "[0-9]*",
          maxLength: mask.length,
        }
      : { value: valueProp, defaultValue }),
  };

  return (
    <div className="flex flex-col">
      <div className={inputWrapper({ error, className })}>
        {label && (
          <label htmlFor={inputId} className={inputLabel()}>
            {label}
            {required && <span className="text-gray-500"> *</span>}
          </label>
        )}
        <input {...inputProps} />
      </div>
      
      {error && errorMessage && (
        <span id={inputId + "-error"} className={inputErrorMessage()} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
