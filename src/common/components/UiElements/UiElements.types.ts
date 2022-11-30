import { ReactNode } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

export interface SelectProps {
  children: ReactNode;
  register: UseFormRegisterReturn<string>;
}
export interface InfoModalProps {
  isError?: boolean;
  message: string;
  title: string;
  onClose: () => void;
}
export interface InputFormProps {
  register: UseFormRegisterReturn<string>;
  label?: string;
  placeholder?: string;
  type?: string;
  autoCompleteOff?: boolean;
  errors: FieldErrors<{ [key: string]: string }>;
}
