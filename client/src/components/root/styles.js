import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    height: inherit;
`

export const Sidebar = styled.nav`
    background: rgba(99,177,255,0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: white;
    width: 230px;
    height: 100%;
    display: flex;
    padding: 20px;
    flex-direction: column;
    gap: 20px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    justify-content: center;
`

export const SidebarLink = styled(NavLink)`
    display: block;
    text-decoration: none;
    color: white;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    &:hover {
        text-decoration: underline;
    }
`

export const Exit = styled.div`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
export const Content = styled.div`
    margin-left: 260px;
    width: 100%;
`


