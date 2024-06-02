import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from '../form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader } from "../loader";
import * as SC from './styles';

export const AuthForm = ({ title, buttonText, onSubmit, isAuth, loading, error, navigateTo, onNavigate, message }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const dispatch = useDispatch();

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(dispatch, formValues)
    }

    useEffect(() => {
        if (isAuth && navigateTo) {
            onNavigate(navigateTo)
        }
    }, [isAuth, navigateTo, onNavigate])

    const disabled = !formValues.email || formValues.password.length <= 3

    return (loading || isAuth) ? (<Loader />) : (
        <SC.Container>
            <Form onSubmit={handleSubmit}>
                <SC.Title>{title}</SC.Title>
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
                <Button type='submit' className='primary' disabled={disabled}>{buttonText}</Button>
                {error && <SC.Text className='error'>{error}</SC.Text>}
            </Form>
            {message}
        </SC.Container>
    )
}
 