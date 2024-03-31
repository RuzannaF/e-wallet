import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError, registration } from "../../redux/slices/AuthSlice"
import { Form } from '../../components/Form'
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import * as SC from './styles'

export const RegistrationPage = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''})

    const dispatch = useDispatch()

    const { user, error} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValues
        dispatch(registration({ email, password }))
    }

    const disabled = !formValues.email || formValues.password.length <= 3

    return (
        <SC.Container>
        <Form onSubmit={onSubmit}>
        <SC.Title>Регистрация</SC.Title>
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
            <Button type='submit' className='primary' disabled={disabled}>Зарегистрироваться</Button>
            {user.id && !user.isActivated && <SC.Text className='normal'>Для завершения регистрации перейдите по ссылке из письма в почте</SC.Text>}
            {error.registration && <SC.Text className='error'>{error.registration}</SC.Text>}
        </Form>
     </SC.Container>
    )
}