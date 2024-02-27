import {NavLink, Outlet} from 'react-router-dom'
import { Container } from "../container"


export const Root = () => {
    return (
        <Container>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/wallet">Мой кошелек</NavLink>
            <NavLink to="/history">История</NavLink>
            <Outlet />
        </Container>
    )
}