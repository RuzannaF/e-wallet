import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/authForm";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuth, error, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuth) {
            navigate('/wallet')
        }
        dispatch(clearError());
    }, [isAuth, navigate, dispatch])

    const handleLogin = (dispatch, formValues) => {
        const { email, password } = formValues
        dispatch(login({ email, password }))
    }

    return (
        <AuthForm
            title="Авторизация"
            buttonText="Войти в аккаунт"
            onSubmit={handleLogin}
            isAuth={isAuth}
            loading={loading}
            error={error.login}
            navigateTo="/wallet"
            onNavigate={navigate}
            message={null}
        />
    )
}