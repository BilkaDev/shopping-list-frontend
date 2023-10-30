import { useMemo } from 'react';

import { Portal } from '../common';
import { ModalOverlayProps, PORTAL_IDS } from '../../UiElements.types';

import { Backdrop } from './Backdrop';
import './Modal.css';

const ModalOverlay = ({
  children,
  className,
  contentClass,
  footer,
  footerClass,
  header,
  headerClass,
  style,
}: ModalOverlayProps) => {
  const content = (
    <div className={`Modal ${className}`} style={style}>
      <header className={`Modal__header ${headerClass}`}>
        <h2>{useMemo(() => header, [header])}</h2>
      </header>
      <div className={`Modal__content ${contentClass}`}>{children}</div>
      <footer className={`Modal__footer ${footerClass}`}>{footer}</footer>
    </div>
  );

  return <Portal portalId={PORTAL_IDS.modalHook}>{content}</Portal>;
};

export const Modal = (props: ModalOverlayProps) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} children={props.children} />
    </>
  );
};
