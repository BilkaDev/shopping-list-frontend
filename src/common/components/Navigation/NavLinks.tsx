import React from "react";
import {NavLink} from "react-router-dom";
import './NavLinks.css'

export const NavLinks = () => {

    return (
        <div className="NavLinks">
            <ul className="NavLinks__list">
                <li>
                    <NavLink to="/list">Listy</NavLink>
                </li>
                <li>
                    <NavLink to="/recipe">Przepisy</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Produkty</NavLink>
                </li>

            </ul>
        </div>

    )
}