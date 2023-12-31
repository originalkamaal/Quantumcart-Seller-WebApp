import React from "react";
import { InputProps } from "../types";


const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  className,
  ifError,
  maxLength,
}) => (
  <>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={` ${className}  ${
        !ifError && "mb-4"
      }  p-2.5 bg-gray-50 w-full placeholder:text-xs border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block pl-2.5`}
    />
    {ifError && <p className="text-red-500 mb-4 mt-1 text-xs">{ifError}</p>}
  </>
);

export default Input;
