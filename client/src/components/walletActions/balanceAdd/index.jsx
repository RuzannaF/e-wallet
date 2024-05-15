import { useState } from 'react'
import { CurrencyRadio } from "../../сurrencyRadio"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { addBalance } from "../../../redux/slices/balanceSlice"
import { useDispatch, useSelector } from 'react-redux'
import * as SC from './styles'


export const BalanceAdd = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const [amountToAdd, setAmountToAdd] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)

    const { id } = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    const changeAmount = (e) => {
        const amount = Number(e.target.value)
        if (isNaN(amount)) {
            setAmountToAdd('')
            setMessage('Введите сумму цифровыми значениями')
            return
        }
        setMessage(null)
        setAmountToAdd(e.target.value)
    }

    const addAmount = () => {
        if (amountToAdd === '0' || amountToAdd === '') {
            return setMessage('Вы пополнили баланс на 0, очень умно...')
        }
        dispatch(addBalance({ userId: id, currency: selectedCurrency, amountToAdd: amountToAdd }))
        setMessage(`Вы пополнили баланс на ${amountToAdd} ${selectedCurrency}`)
    }

    const disabled = message === 'Введите сумму цифровыми значениями' || !amountToAdd || !selectedCurrency

    return (
        <SC.Container>
            <SC.Message>Выберите валюту:</SC.Message>
            <CurrencyRadio selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
            <Input
                type="text"
                name='amountToAdd'
                placeholder='Введите сумму пополнения'
                value={amountToAdd}
                onChange={changeAmount}
                className='mediumInput'
            />
            {message && <SC.Message className={error ? 'error' : ''}>{message}</SC.Message>}
            <Button onClick={addAmount} className='primary' disabled={disabled}>Пополнить</Button>
        </SC.Container>
    )
}
