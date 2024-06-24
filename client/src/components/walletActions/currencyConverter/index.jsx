import { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { convertCurrency } from "../../../redux/slices/balanceSlice"
import { Arrow } from '../../../svg/arrow';
import { calculateAmount } from '../../../helpers/calculateAmount';
import { validateAmount } from '../../../helpers/validateAmount';
import { getRates } from '../../../helpers/getRates';
import { TargetInput } from '../../targetInput';
import { BaseInput } from '../../baseInput';
import * as SC from './styles'

export const CurrencyConverter = () => {
    const [base, setBase] = useState({ amount: '', currency: '' })
    const [target, setTarget] = useState({ amount: '', currency: '' })
    const [rates, setRates] = useState('')
    const [notification, setNotification] = useState({ message: null, error: false })

    const dispatch = useDispatch()
    const { id } = useSelector((state) => state.auth.user)

    const bothCurrencySelected = base.currency && target.currency
    const bothAmount = base.amount && target.amount

    // этот useEffect нужен чтобы при выборе валюты, запрашивался новый курс для новой пары валют
    // соотв. после смены курса нужно изменить значения сумм
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (bothCurrencySelected) {
                    const newRates = await getRates(base.currency, target.currency)
                    setRates(newRates)
        
                    if (notification.message === 'Выберите валюту') {
                        setNotification({ message: null, error: false })
                    }
        
                    if (bothAmount) {
                        const newTargetAmount = await calculateAmount(newRates, 'target', base.amount)
                        setTarget(prevTarget => ({
                            ...prevTarget,
                            amount: newTargetAmount
                        }))
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [base.currency, target.currency])

    const convertSelectedCurrency = () => {
        // перед конвертацией проверяю валидность amount
        const validtedTargetAmount = target.amount ? validateAmount(target.amount) : { isValid: false }
        const validtedBaseAmount = base.amount ? validateAmount(base.amount) : { isValid: false }

        if (!validtedTargetAmount.isValid || !validtedBaseAmount.isValid) {
            return setNotification({ message: 'Неккоректный ввод', error: true })
        }
        dispatch(convertCurrency({ baseCurrency: base.currency, targetCurrency: target.currency, amountToBuy: target.amount, userId: id }))

        setTarget(prevTarget => ({
            ...prevTarget,
            amount: ''
        }))
        setBase(prevBase => ({
            ...prevBase,
            amount: ''
        }))

        setNotification({ message: 'Конвертация прошла успешно', error: false })
    }

    const disabled = notification.error || !bothAmount

    return (
        <SC.Container>
            <SC.Row>
                <SC.Container>
                    <BaseInput
                        target={target}
                        setTarget={setTarget}
                        base={base}
                        setBase={setBase}
                        rates={rates}
                        setRates={setRates}
                        notification={notification}
                        setNotification={setNotification}
                    />
                </SC.Container>
                <Arrow />
                <SC.Container>
                    <TargetInput
                        target={target}
                        setTarget={setTarget}
                        base={base}
                        setBase={setBase}
                        rates={rates}
                        setRates={setRates}
                        notification={notification}
                        setNotification={setNotification}
                    />
                </SC.Container>
            </SC.Row>
            {rates ? <SC.Message>1 {base.currency} = {rates} {target.currency}</SC.Message> : <br />}
            <Button disabled={disabled} className='primary' onClick={convertSelectedCurrency}>Конвертировать</Button>
            {notification.message && <SC.Message className={notification.error ? 'error' : ''}>{notification.message}</SC.Message>}
        </SC.Container>
    )
}
