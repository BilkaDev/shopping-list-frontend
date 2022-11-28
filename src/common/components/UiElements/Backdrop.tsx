import ReactDOM from 'react-dom';

import './Backdrop.css';

interface Props {
  onClick: () => void;
}

export const Backdrop = ({ onClick }: Props) => {
  return ReactDOM.createPortal(
    <div className="Backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook') as HTMLElement
  );
};
