import { useDispatch, useSelector } from "react-redux";
import { clearError, registration } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { AuthForm } from "../../components/authForm";
import { useNavigate } from "react-router-dom";
import * as SC from './styles'

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, error, isAuth, loading } = useSelector((state) => state.auth);
    const [showActivationMessage, setShowActivationMessage] = useState(false);

    useEffect(() => {
        if (user.id && !user.isActivated) {
            setShowActivationMessage(true)
        } else if (isAuth) {
            navigate('/wallet')
        }
        dispatch(clearError())
    }, [isAuth, navigate, dispatch])

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const handleRegistration = (dispatch, formValues) => {
        const { email, password } = formValues
        dispatch(registration({ email, password }))
    }

    return (
        <>
            <AuthForm
                title="Регистрация"
                buttonText="Зарегистрироваться"
                onSubmit={handleRegistration}
                isAuth={isAuth}
                loading={loading}
                error={error.registration}
                navigateTo="/wallet"
                onNavigate={navigate}
                message={
                    showActivationMessage && <SC.Text className='normal'>Для завершения регистрации перейдите по ссылке из письма в почте</SC.Text>
                }
            />
        </>
    )
}