import { useDispatch, useSelector } from "react-redux";
import { clearError, registration } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { AuthForm } from "../../components/authForm";
import { Navigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import * as SC from './styles'

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const { user, error, isAuth, loading } = useSelector((state) => state.auth);
    const [showActivationMessage, setShowActivationMessage] = useState(false);

    useEffect(() => {
        if (user.id && !user.isActivated) {
            setShowActivationMessage(true)
        }
        dispatch(clearError())
    }, [isAuth, dispatch])

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const handleRegistration = (formValues) => {
        const { email, password } = formValues
        dispatch(registration({ email, password }))
    }

    return (
        <>
            {loading && <Loader />}
            {isAuth && <Navigate to='/wallet' />}
            {(!isAuth && !loading) && <AuthForm
                title="Регистрация"
                buttonText="Зарегистрироваться"
                onSubmit={handleRegistration}
                error={error.registration}
                message={
                    showActivationMessage && <SC.Text className='normal'>Для завершения регистрации перейдите по ссылке из письма в почте</SC.Text>
                }
            />}
        </>
    )
}