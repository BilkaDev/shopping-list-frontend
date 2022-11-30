import ReactDOM from 'react-dom';
import { BackdropProps } from './UiElements.types';
import './Backdrop.css';

export const Backdrop = ({ onClick }: BackdropProps) => {
  return ReactDOM.createPortal(
    <div className="Backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook') as HTMLElement
  );
};
