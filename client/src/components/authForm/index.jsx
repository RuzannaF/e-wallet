import { useState } from "react";
import { Form } from '../form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as SC from './styles';

export const AuthForm = ({ title, buttonText, onSubmit, error, message }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValues)
    }

    const disabled = !formValues.email || formValues.password.length <= 3

    return (
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
 