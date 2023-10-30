import { ChangeEvent, CSSProperties, ReactNode } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

export interface SelectProps {
  children: ReactNode;
  register: UseFormRegisterReturn<string>;
}

export interface InfoModalProps {
  message: string;
  title: string;
  onClose: () => void;
  isError?: boolean;
}

export interface SuccessfullyBoxProps {
  setIsSuccess: (v: boolean) => void;
  text: string;
}

export interface SectionProps {
  children: ReactNode;
}

export interface ModalChakraProps {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  title: string;
}

export interface ModalOverlayProps {
  className?: string;
  headerClass?: string;
  footerClass?: string;
  header: string;
  footer?: JSX.Element;
  contentClass?: string;
  onCancel: () => void;
  style?: CSSProperties;
  children: ReactNode;
  show: boolean;
}

export interface BackdropProps {
  onClick: () => void;
}

export interface InputFormProps {
  register: UseFormRegisterReturn<string>;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: 'off' | 'on' | 'new-password';
  defaultValue?: string;
  errors: FieldErrors<{ [key: string]: string }>;
}

export enum PORTAL_IDS {
  modalHook = 'modal-hook',
  backdropHook = 'backdrop-hook',
  loadingSpinnerHook = 'loading-spinner-hook',
}

export interface PortalProps {
  children: ReactNode;
  portalId: string;
}
