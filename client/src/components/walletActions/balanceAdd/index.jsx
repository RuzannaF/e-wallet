import { useState } from 'react'
import { CurrencyRadio } from "../../сurrencyRadio"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { addBalance } from "../../../redux/slices/balanceSlice"
import { useDispatch, useSelector } from 'react-redux'
import * as SC from './styles'
import { validateAmount } from '../../../helpers/validateAmount'


export const BalanceAdd = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const [amountToAdd, setAmountToAdd] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)

    const { id } = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    const changeAmount = (e) => {
        const amount = e.target.value
        const isAmountValid = validateAmount(amount)
        if (isAmountValid) {
            setAmountToAdd(amount)
            setMessage(null)
            setError(false)
        } else {
            setMessage('Некорректный ввод')
            setError(true)
        }
    }

    const addAmount = () => {
        if (amountToAdd === '0' || amountToAdd === '') {
            return setMessage('Вы пополнили баланс на 0, очень умно...')
        }
        dispatch(addBalance({ userId: id, currency: selectedCurrency, amountToAdd: amountToAdd }))
        setError(false)
        setMessage(`Вы пополнили баланс на ${amountToAdd} ${selectedCurrency}`)
    }

    const disabled = message === 'Некорректный ввод' || !amountToAdd || !selectedCurrency

    const buttonError = () => {
        if (!selectedCurrency) {
            setMessage('Пожалуйста, выберите валюту')
            setError(true)
        } else if (!amountToAdd) {
            setMessage('Пожалуйста, введите сумму')
            setError(true)
        }
    }

    return (
        <SC.Container>
            <SC.Message>Выберите валюту:</SC.Message>
            <CurrencyRadio selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} highlight={error && !selectedCurrency} />
            <Input
                type="text"
                name='amountToAdd'
                placeholder='Введите сумму пополнения'
                value={amountToAdd}
                onChange={changeAmount}
                className={`mediumInput ${message === 'Пожалуйста, введите сумму' ? 'errorInput' : 0}` }
            />
            {message && <SC.Message className={error ? 'error' : ''}>{message}</SC.Message>}
            <SC.ButtonWrapper>
                <Button onClick={addAmount} className='primary' disabled={disabled}>Пополнить</Button>
                {disabled && <SC.ErrorBlock onClick={buttonError} />}
            </SC.ButtonWrapper>
        </SC.Container>
    )
}
