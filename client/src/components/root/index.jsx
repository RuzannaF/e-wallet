import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/slices/authSlice';
import { Container } from "../container"
import { Button } from '../ui/Button'

export const Root = () => {
   const { user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const exitButton = () => {
      dispatch(logout())
      navigate('/')
   }
    return (
        <Container>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/wallet">Мой кошелек</NavLink>
            <NavLink to="/history">История</NavLink>
            {!user && <NavLink to="/registration">Регистрация</NavLink>}
            {!user &&<NavLink to="/auth">Авторизация</NavLink>}
            {user && <Button className={'regular'} onClick={exitButton}>Выйти из аккаунта</Button>}
            <Outlet />
        </Container>
    )
}