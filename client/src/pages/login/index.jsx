import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError, login } from "../../redux/slices/authSlice"
import { Form } from '../../components/form'
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import * as SC from './styles'

export const LoginPage = () => {

    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth, error } = useSelector((state) => state.auth)

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValues;
        dispatch(login({ email, password }));
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/wallet') 
        } 
        dispatch(clearError())
    }, [isAuth, navigate, dispatch])

    const disabled = !formValues.email || !formValues.password

    return isAuth ? (
        <Loader />
    ) : (
        <SC.Container>
            <Form onSubmit={onSubmit}>
                <SC.Title>Авторизация</SC.Title>
                <Input
                    type="email"
                    name='email'
                    placeholder='email'
                    value={formValues.email}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <Input
                    type="password"
                    placeholder='password'
                    name='password'
                    value={formValues.password}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                />
                <Button type='submit' className='primary' disabled={disabled}>Войти в аккаунт</Button>
                <SC.Text className='normal' onClick={() => navigate('/registration')}>Перейти на страницу регистрации</SC.Text>
                {error.login && <SC.Text className='error'>{error.login}</SC.Text>}
            </Form>
        </SC.Container>
    )
}