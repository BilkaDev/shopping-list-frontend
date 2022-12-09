import { ReactNode } from 'react';

export interface LoginFormInputs {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface RecoverFormInputs {
  email: string;
}
export interface AuthFormProps {
  isLogin?: boolean;
  children: ReactNode;
}
