import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/slices/authSlice"
import { Form } from '../../components/Form'
import { Title } from '../../components/Title'
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''})

    const dispatch = useDispatch()

    const { user, isAuth} = useSelector((state) => state.auth)

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValues;
        dispatch(login({ email, password }));
    }

    return (
        <>
        <Title>Авторизация</Title>
        <Form onSubmit={onSubmit}>
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
            
            <Button type='submit' className='primary'>Войти в аккаунт</Button>
        </Form>
     </>
    )
}