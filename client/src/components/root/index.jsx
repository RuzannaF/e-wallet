import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logout } from '../../redux/slices/AuthSlice';
import * as SC from './styles'

export const Root = () => {
    const { id, isActivated } = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [dispatch])

    const exitButton = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <SC.Container>
            <SC.Sidebar>
                <SC.SidebarLink to="/wallet">Мой кошелек</SC.SidebarLink>
                <SC.SidebarLink to="/history">История</SC.SidebarLink>
                {id && isActivated && <SC.Exit onClick={exitButton}>Выйти из аккаунта</SC.Exit>}
                {!isActivated && <SC.SidebarLink to="/">Авторизация</SC.SidebarLink>}
            </SC.Sidebar>
            <SC.Content>
                <Outlet />
            </SC.Content>
        </SC.Container>
    )
}