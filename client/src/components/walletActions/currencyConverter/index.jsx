import { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { convertCurrency } from "../../../redux/slices/balanceSlice"
import { Arrow } from '../../../svg/arrow';
import { calculateAmount } from '../../../helpers/calculateAmount';
import { validateAmount } from '../../../helpers/validateAmount';
import { getRates } from '../../../helpers/getRates';
import { CurrencyInput } from '../../currencyInput'
import * as SC from './styles'

export const CurrencyConverter = () => {
    const [base, setBase] = useState({ amount: '', currency: '' })
    const [target, setTarget] = useState({ amount: '', currency: '' })
    const [rates, setRates] = useState('')
    const [notification, setNotification] = useState({ message: null, error: false })

    const dispatch = useDispatch()
    const { id } = useSelector((state) => state.auth.user)
    const { balance } = useSelector((state) => state.balance)

    const changeAmount = (e, setter) => {
        const amount = e.target.value
        const valideAmount = validateAmount(amount)
        if (valideAmount.isValid) { // только если сумма валидна, можно будет ее использовать для изменения инпута с другой суммой
            if (target.currency && base.currency) {
                if (setter === setBase) { // если пользователь ввел валюту из которой хочет перевести
                    if (amount > balance[base.currency]) { // проверяем есть ли у него достаточная сумма на счету
                        setNotification({ message: 'Недостаточно валюты для перевода', error: true })
                    } else {
                        setNotification({ message: null, error: false })
                    }
                    const newTargetAmount = calculateAmount(rates, 'target', amount) // считаем сколько будет той валюты, в которую хотят перевести
                    setTarget(prevTarget => ({
                        ...prevTarget,
                        amount: newTargetAmount
                    }))
                } else {
                    const newBaseAmount = calculateAmount(rates, 'base', amount) // считаем сколько пользователю нужно валюты на счету, чтобы купить желаемую валюту 
                    if (newBaseAmount > balance[base.currency]) {
                        setNotification({ message: 'Недостаточно валюты для перевода', error: true })
                    } else {
                        setNotification({ message: null, error: false })
                    }
                    setBase(prevBase => ({
                        ...prevBase,
                        amount: newBaseAmount
                    }))
                }
            } else {
                setNotification({ message: 'Выберите валюту', error: true }) // если не выбраны обе валюты, будет предупреждение
            }
        }
        setter(prevState => ({
            ...prevState,
            amount: amount
        })) // даже если сумма не валидна, меняю значение инпута
    }
    // этот useEffect нужен чтобы при выборе валюты, запрашивался новый курс для новой пары валют
    useEffect(() => {
        const fetchData = async () => {
            if (base.currency && target.currency) {
                try {
                    const newRates = await getRates(base.currency, target.currency)
                    setRates(newRates)
                    if (notification.message === 'Выберите валюту') { // если до этого была ошибка с выбором валюты, то убираю ее, тк по условию все валюты выбраны
                        setNotification({ message: null, error: false })
                    }
                } catch (error) {
                    console.error(error)
                }
            } //else if (!base.amount) {
            //setNotification({ message: null, error: false })
            //}
        }
        fetchData()
    }, [base.currency, target.currency])

    // этот useEffect нужен чтобы при изменении курса пересчитывалcя target.amount
    useEffect(() => {
        if (base.amount && target.amount) {
            const newTargetAmount = calculateAmount(rates, 'target', base.Amount)
            setTarget(prevTarget => ({
                ...prevTarget,
                amount: newTargetAmount
            }))
        }
    }, [rates])

    const convertSelectedCurrency = () => {
        // перед конвертацией проверяю валидность amount
        const valideTargetAmount = validateAmount(target.amount)
        const valideBaseAmount = validateAmount(base.amount)
        console.log(valideTargetAmount, valideBaseAmount)
        if (!valideTargetAmount.isValid || !valideBaseAmount.isValid) {
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

    const handleCurrencyChange = (currency, setter) => {
        setter(prevState => ({
            ...prevState,
            currency: currency
        }))
        // если пользователь меняет валюту на ту, что уже выбрана в другом инпуте, то сбрасывается все
        // это сделано для того, чтобы нельзя было выбрать две одинаковые валюты
        // и соотв. если выбрана только одна валюта, не будет курса и нельзя будет посчитать кол-во другой валюты, поэтому сбрасываю все amount
        if (setter === setBase && currency === target.currency) {
            setTarget({ amount: '', currency: '' })
            setBase(prevBase => ({
                ...prevBase,
                amount: ''
            }))
            setRates('')
        } else if (setter === setTarget && currency === base.currency) {
            setBase({ amount: '', currency: '' })
            setTarget(prevTarget => ({
                ...prevTarget,
                amount: ''
            }))
            setRates('')
        }
    }

    const disabled = notification.error || !base.amount || !target.amount

    return (
        <SC.Container>
            <SC.Row>
                <SC.Container>
                    <CurrencyInput
                        currency="base"
                        selectedCurrency={base.currency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, setBase)}
                        amount={base.amount}
                        onChange={(e) => changeAmount(e, setBase, base.currency)}
                        placeholder={base.currency}
                        notification={notification}
                    />
                </SC.Container>
                <Arrow />
                <SC.Container>
                    <CurrencyInput
                        currency="target"
                        selectedCurrency={target.currency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, setTarget)}
                        amount={target.amount}
                        onChange={(e) => changeAmount(e, setTarget, target.currency)}
                        placeholder={target.currency}
                        notification={notification}
                    />
                </SC.Container>
            </SC.Row>
            {rates ? <SC.Message>1 {base.currency} = {rates} {target.currency}</SC.Message> : <br />}
            <Button disabled={disabled} className='primary' onClick={convertSelectedCurrency}>Конвертировать</Button>
            {notification.message && <SC.Message className={notification.error ? 'error' : ''}>{notification.message}</SC.Message>}
        </SC.Container>
    )
}
