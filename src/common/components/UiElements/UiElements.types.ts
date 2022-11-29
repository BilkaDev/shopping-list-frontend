import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectProps {
  children: ReactNode;
  register: UseFormRegisterReturn<string>;
}
