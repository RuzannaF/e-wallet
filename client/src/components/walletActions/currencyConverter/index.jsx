import { useState, useEffect} from 'react'
import { CurrencyRadio } from "../../сurrencyRadio"
import { Button } from '../../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../ui/input'
import { convertCurrency } from "../../../redux/slices/balanceSlice"
import { Arrow } from '../../../svg/arrow';
import { calculateAmount } from '../../../helpers/calculateAmount';
import * as SC from './styles'
import { validateAmount } from '../../../helpers/validateAmount';
import { getRates } from '../../../helpers/getRates';

export const CurrencyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState('')
    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')
    const [rates, setRates] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const { id } = useSelector((state) => state.auth.user)
    const { balance } = useSelector((state) => state.balance)

    const changeAmount = (e, setter) => {
        const amount = e.target.value
        const isAmountValid = validateAmount(amount)
        if(!isAmountValid) {
            setMessage('Некорректный ввод')
            setError(true)
            return
        }
        if (targetCurrency && baseCurrency) {
            if (setter === setBaseAmount) {
                if (amount > balance[baseCurrency]) {
                    setMessage('Недостаточно валюты для перевода')
                    setError(true)
                } else {
                    setMessage(null)
                    setError(false)
                }
                const newTargetAmount = calculateAmount(rates, 'target', amount)
                setTargetAmount(newTargetAmount)
            } else {
                const newBaseAmount = calculateAmount(rates, 'base', amount)
                if (newBaseAmount > balance[baseCurrency]) {
                    setMessage('Недостаточно валюты для перевода')
                    setError(true)
                } else {
                    setMessage(null)
                    setError(false)
                }
                setBaseAmount(newBaseAmount)
            }
            setter(amount)
        } else {
            setMessage('Выберите валюту')
            setError(true)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (baseCurrency && targetCurrency) {
                try {
                    const newRates = await getRates(baseCurrency, targetCurrency)
                    setRates(newRates)
                    if (message === 'Выберите валюту') {
                        setMessage(null)
                    }
                } catch (error) {
                    console.error(error)
                }
            } else if (!baseAmount) {
                setMessage(null)
            }
        }
        fetchData()
    }, [baseCurrency, targetCurrency])

    useEffect(() => {
        if (baseAmount && targetAmount) {
            const newTargetAmount = calculateAmount(rates, 'target', baseAmount)
            setTargetAmount(newTargetAmount)
        }
    }, [rates])

    const convertSelectedCurrency = () => {
        dispatch(convertCurrency({ baseCurrency: baseCurrency, targetCurrency: targetCurrency, amountToBuy: targetAmount, userId: id }))
        setTargetAmount('')
        setBaseAmount('')
        setMessage('Конвертация прошла успешно')
        setError(false)
    }
    const handleCurrencyChange = (currency, setter) => {
        setter(currency)
        if (setter === setBaseCurrency && currency === targetCurrency) {
            setTargetCurrency('')
            setRates('')
            setBaseAmount('')
            setTargetAmount('')
        } else if (setter === setTargetCurrency && currency === baseCurrency) {
            setBaseCurrency('')
            setRates('')
            setBaseAmount('')
            setTargetAmount('')
        }
    }

    const disabled = error || !baseAmount || !targetAmount

    return (
        <SC.Container>
            <SC.Row>
                <SC.Container>
                    <CurrencyRadio selectedCurrency={baseCurrency} setSelectedCurrency={(currency) => handleCurrencyChange(currency, setBaseCurrency)} highlight={message === 'Выберите валюту'} />
                    <Input
                        type="text"
                        name='baseAmount'
                        placeholder={baseCurrency}
                        value={baseAmount}
                        onChange={(e) => changeAmount(e, setBaseAmount)}
                        className={`smallInput ${error && message ? 'errorInput' : ''}`}
                    />
                </SC.Container>
                <Arrow />
                <SC.Container>
                    <CurrencyRadio selectedCurrency={targetCurrency} setSelectedCurrency={(currency) => handleCurrencyChange(currency, setTargetCurrency)} highlight={message === 'Выберите валюту'} />
                    <Input
                        type="text"
                        name='baseAmount'
                        placeholder={targetCurrency}
                        value={targetAmount}
                        onChange={(e) => changeAmount(e, setTargetAmount)}
                        className={`smallInput ${error && message ? 'errorInput' : ''}`}
                    />
                </SC.Container>
            </SC.Row>
            {rates ? <SC.Message>1 {baseCurrency} = {rates} {targetCurrency}</SC.Message> : <br />}
            <Button disabled={disabled} className='primary' onClick={convertSelectedCurrency}>Конвертировать</Button>
            {message && <SC.Message className={error ? 'error' : ''}>{message}</SC.Message>}
        </SC.Container>
    )
}
