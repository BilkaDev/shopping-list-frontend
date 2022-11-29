import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
