import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface Props {
    onClick: ()=> void;
}

export const Backdrop = (props: Props) => {
    return ReactDOM.createPortal(
        <div className="Backdrop" onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook') as HTMLElement
    );
};

