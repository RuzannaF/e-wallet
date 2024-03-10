import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registration } from "../../redux/slices/authSlice"
import { Form } from '../../components/Form'
import { Title } from '../../components/Title'
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const RegistrationPage = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''})

    const dispatch = useDispatch()

    const { user, isAuth} = useSelector((state) => state.auth)

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValues;
        dispatch(registration({ email, password }));
    }

    return (
        <>
        <Title>Регистрация</Title>
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
            
            <Button type='submit' className='primary'>Зарегистрироваться</Button>
        </Form>
        {user && !user.isActivated && isAuth && <div>Вы успешно зарегистировались, перейдите по ссылке из письма в почте</div>}
     </>
    )
}