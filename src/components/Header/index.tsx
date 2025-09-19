import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import  { Timer, Scroll } from 'phosphor-react';

export function Header() {
    return (
        <HeaderContainer>
            <span>logo</span>
            <nav>
                <NavLink to="/home">
                    <Timer size={24}/>
                </NavLink>
            </nav>

            <nav>
                <NavLink to="/history">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}