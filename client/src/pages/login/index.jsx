import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthForm } from "../../components/authForm";
import { Loader } from "../../components/loader";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const { isAuth, error, loading } = useSelector((state) => state.auth)

    const handleLogin = (formValues) => {
        const { email, password } = formValues
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    return (
        <>
            {loading && <Loader />}
            {isAuth && <Navigate to='/wallet' />}
            {(!isAuth && !loading) && <AuthForm
                title="Авторизация"
                buttonText="Войти в аккаунт"
                onSubmit={handleLogin}
                error={error.login}
                message={null}
            />}
        </>
    )
}