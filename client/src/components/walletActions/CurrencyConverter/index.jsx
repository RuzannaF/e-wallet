import { useState, useEffect} from 'react'
import axios from 'axios';
import { CurrencyRadio } from "../../сurrencyRadio"
import { Button } from '../../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../ui/input'
import { convertCurrency } from "../../../redux/slices/balanceSlice"
import { Arrow } from '../../../svg/arrow';
import { calculateAmount } from '../../../helpers/calculateAmount';
import * as SC from './styles'

const getRates = (async (baseCurrency, targetCurrency) => {
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_uxrU3VolOLAaPnWrOhTBebNABoSz1vHD7YE7jKsc&currencies=${targetCurrency.toUpperCase()}&base_currency=${baseCurrency.toUpperCase()}`)
    const dataRates = Number(response.data.data[targetCurrency.toUpperCase()])
    return dataRates
})

export const CurrencyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState('')
    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')
    const [rates, setRates] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const { id } = useSelector((state) => state.auth.user)
    const { balance } = useSelector((state) => state.balance)

    const changeAmount = (e, setter) => {
        const amount = e.target.value
        if (isNaN(amount)) {
            setBaseAmount('')
            setTargetAmount('')
            setMessage('Введите сумму пополнения цифрами')
            return
        }
        if (targetCurrency && baseCurrency) {
            if (setter === setBaseAmount) {
                if (amount > balance[baseCurrency]) {
                    setMessage('Недостаточно валюты для перевода')
                } else {
                    setMessage(null)
                }
                const newTargetAmount = calculateAmount(rates, 'target', amount)
                setTargetAmount(newTargetAmount)
            } else {
                const newBaseAmount = calculateAmount(rates, 'base', amount)
                if (newBaseAmount > balance[baseCurrency]) {
                    setMessage('Недостаточно валюты для перевода')
                } else {
                    setMessage(null)
                }
                setBaseAmount(newBaseAmount)
            }
            setter(amount)
        } else {
            setMessage('Выберите валюту')
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

    const disabled = message === 'Введите сумму пополнения цифрами' ||
        message === 'Недостаточно валюты для перевода' ||
        !baseAmount ||
        !targetAmount

    return (
        <SC.Container>
            <SC.Row>
                <SC.Container>
                    <CurrencyRadio selectedCurrency={baseCurrency} setSelectedCurrency={(currency) => handleCurrencyChange(currency, setBaseCurrency)} />
                    <Input
                        type="text"
                        name='baseAmount'
                        placeholder={baseCurrency}
                        value={baseAmount}
                        onChange={(e) => changeAmount(e, setBaseAmount)}
                        className={`smallInput ${message === 'Введите сумму пополнения цифрами' || message === 'Недостаточно валюты для перевода' ? 'errorInput' : ''}`}
                    />
                </SC.Container>
                <Arrow />
                <SC.Container>
                    <CurrencyRadio selectedCurrency={targetCurrency} setSelectedCurrency={(currency) => handleCurrencyChange(currency, setTargetCurrency)} />
                    <Input
                        type="text"
                        name='baseAmount'
                        placeholder={targetCurrency}
                        value={targetAmount}
                        onChange={(e) => changeAmount(e, setTargetAmount)}
                        className={`smallInput ${message === 'Введите сумму пополнения цифрами' || message === 'Недостаточно валюты для перевода' ? 'errorInput' : ''}`}
                    />
                </SC.Container>
            </SC.Row>
            {rates ? <SC.Message>1 {baseCurrency} = {rates} {targetCurrency}</SC.Message> : <br />}
            <Button disabled={disabled} className='primary' onClick={convertSelectedCurrency}>Конвертировать</Button>
            {message && <SC.Message>{message}</SC.Message>}
        </SC.Container>
    )
}