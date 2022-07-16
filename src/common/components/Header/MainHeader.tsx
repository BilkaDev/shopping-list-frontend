import {NavLink} from "react-router-dom";
import './MainHeader.css';

export const MainHeader = () => {

    return (
        <header className="MainHeader">
            <NavLink to={'/'}><h1>Lista zakupów</h1>
            </NavLink>
        </header>
    );
};