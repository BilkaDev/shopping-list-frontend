import { CSSProperties, ReactNode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { Backdrop } from './Backdrop';

interface Props {
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

const ModalOverlay = ({
  children,
  className,
  contentClass,
  footer,
  footerClass,
  header,
  headerClass,
  style,
}: Props) => {
  const content = (
    <div className={`Modal ${className}`} style={style}>
      <header className={`Modal__header ${headerClass}`}>
        <h2>{useMemo(() => header, [header])}</h2>
      </header>
      <div className={`Modal__content ${contentClass}`}>{children}</div>
      <footer className={`Modal__footer ${footerClass}`}>{footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};

export const Modal = (props: Props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} children={props.children} />
    </>
  );
};
