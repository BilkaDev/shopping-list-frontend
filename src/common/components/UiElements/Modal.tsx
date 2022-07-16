import React, {useMemo} from 'react';
import ReactDOM from "react-dom";
import './Modal.css'
import {Backdrop} from "./Backdrop";

interface Props {
    className?:string;
    headerClass?:string;
    footerClass?:string;
    header:string;
    footer?:JSX.Element;
    contentClass?:string;
    onCancel: ()=> void;
    style?: React.CSSProperties;
    children: React.ReactNode;
    show: boolean;

}

const ModalOverlay = (props:Props) => {
    const content = (
        <div className={`Modal ${props.className}`} style={props.style}>
            <header className={`Modal__header ${props.headerClass}`}>
                <h2>{useMemo(() => props.header, [])}</h2>
            </header>
            <div className={`Modal__content ${props.contentClass}`}>
                {props.children}
            </div>
                <footer className={`Modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
        </div>
    )
    return ReactDOM.createPortal(content,document.getElementById('modal-hook') as HTMLElement)
}

export const Modal = (props:Props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel}/>}
            <ModalOverlay {...props} children={props.children}/>
        </>
    );
};