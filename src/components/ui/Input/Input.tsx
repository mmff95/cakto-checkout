"use client";

import { inputWrapper, inputLabel, input, inputErrorMessage } from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = ({
  label,
  required = false,
  error = false,
  errorMessage,
  className,
  inputClassName,
  id,
  ...props
}: InputProps) => {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="flex flex-col">
      <div className={inputWrapper({ error, className })}>
        {label != null && (
          <label htmlFor={inputId} className={inputLabel()}>
            {label}
            {required && <span className="text-gray-500"> *</span>}
          </label>
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
          className={input({
            className: label != null ? `pt-3 ${inputClassName ?? ""}` : inputClassName,
          })}
          {...props}
        />
      </div>
      {error && errorMessage != null && errorMessage !== "" && (
        <span id={`${inputId}-error`} className={inputErrorMessage()} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
