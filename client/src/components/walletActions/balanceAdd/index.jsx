import { useState } from 'react'
import { CurrencyRadio } from "../../сurrencyRadio"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { addBalance } from "../../../redux/slices/balanceSlice"
import { useDispatch, useSelector } from 'react-redux'
import { validateAmount } from '../../../helpers/validateAmount'
import * as SC from './styles'


export const BalanceAdd = () => {
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [amountToAdd, setAmountToAdd] = useState('')
    const [notification, setNotification] = useState({ message: null, error: false })

    const { id } = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    const changeAmount = (e) => {
        setAmountToAdd(e.target.value)
    }

    const addAmount = () => {
        const valideAmount = validateAmount(amountToAdd)
        if (!valideAmount.isValid) {
            setNotification({ message: valideAmount.message, error: true })
            return
        }
        if (!selectedCurrency) {
            setNotification({ message: 'Пожалуйста, выберите валюту', error: true })
            return
        }
        if (!amountToAdd) {
            setNotification({ message: 'Пожалуйста, введите сумму', error: true })
            return
        }
        dispatch(addBalance({ userId: id, currency: selectedCurrency, amountToAdd: amountToAdd }))
        setNotification({ message: `Вы пополнили баланс на ${amountToAdd} ${selectedCurrency}`, error: false })
    }

    return (
        <SC.Container>
            <SC.Message>Выберите валюту:</SC.Message>
            <CurrencyRadio selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} highlight={notification.error && !selectedCurrency} />
            <Input
                type="text"
                name='amountToAdd'
                placeholder='Введите сумму пополнения'
                value={amountToAdd}
                onChange={changeAmount}
                className={`mediumInput ${notification.message === 'Пожалуйста, введите сумму' ? 'errorInput' : 0}`}
            />
            {notification.message && <SC.Message className={notification.error ? 'error' : ''}>{notification.message}</SC.Message>}
            <Button onClick={addAmount} className='primary'>Пополнить</Button>
        </SC.Container>
    )
}
