import { useEffect, useState } from "react";
import { Input } from '../ui/input';
import { CurrencyRadio } from '../сurrencyRadio';
import { getAllRates } from '../../helpers/getAllRates'
import { calculateAmount } from "../../helpers/calculateAmount";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { validateAmount } from "../../helpers/validateAmount";
import { convertCurrency } from "../../redux/slices/balanceSlice";
import { Arrow } from "../../svg/arrow";
import * as SC from './styles';

export const MyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState(null)
    const [targetCurrency, setTargetCurrency] = useState(null)

    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')

    const [rates, setRates] = useState(null)

    const [notification, setNotification] = useState({ message: null, error: false })

    const dispatch = useDispatch()

    const { id } = useSelector((state) => state.auth.user)

    const bothCurrencySelected = baseCurrency && targetCurrency

    const getRate = () => {
        if (!bothCurrencySelected || !rates) {
            return null
        }

        const base = baseCurrency.toUpperCase()
        const target = targetCurrency.toUpperCase()
        return rates[base][target]
    }

    const rate = getRate()

    const { balance } = useSelector((state) => state.balance)

    const fetchAllRates = async () => {
        const newRates = await getAllRates()
        setRates(newRates)
    }

    const getConvertedAmount = (type, amount) => {
        const convertedAmount = rate ? calculateAmount(rate, type, amount) : ''
        return convertedAmount
    }

    useEffect(() => {
        fetchAllRates()

        const interval = setInterval(() => {
            fetchAllRates()
        }, 5 * 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    const handleInputChange = (e, type) => {
        const amount = e.target.value

        if (type === 'base') {
            setBaseAmount(amount)
            const newTargetAmount = getConvertedAmount(type, amount)
            setTargetAmount(newTargetAmount)
            return
        }

        setTargetAmount(amount)
        const newBaseAmount = getConvertedAmount(type, amount)
        setBaseAmount(newBaseAmount)
    }

    useEffect(() => {

        if (baseAmount > balance[baseCurrency]) {
            setNotification({ message: 'Недостаточно валюты для перевода', error: true })
            return
        }

        setNotification({ message: null, error: false })
    }, [baseAmount])

    const handleCurrencyChange = (currency, type) => {
        if (type === 'base') {
            setBaseCurrency(currency)
            return
        }

        setTargetCurrency(currency)
    }

    const convertSelectedCurrency = () => {
        if (!baseCurrency || !targetCurrency) {
            return setNotification({ message: 'Выберите валюту', error: true })
        }
        const validtedTargetAmount = targetAmount ? validateAmount(targetAmount) : { isValid: false }
        const validtedBaseAmount = baseAmount ? validateAmount(baseAmount) : { isValid: false }

        if (!validtedTargetAmount.isValid || !validtedBaseAmount.isValid) {
            return setNotification({ message: 'Неккоректный ввод', error: true })
        }
        dispatch(convertCurrency({ baseCurrency: baseCurrency, targetCurrency: targetCurrency, amountToBuy: targetAmount, userId: id }))

        setBaseAmount('')
        setTargetAmount('')

        setNotification({ message: 'Конвертация прошла успешно', error: false })
    }

    return (
        <SC.Container>
            <SC.Wrapper>
                <SC.Column>
                    <CurrencyRadio
                        selectedCurrency={baseCurrency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, 'base')} 
                        highlight={notification.message === 'Выберите валюту'}/>
                    <Input
                        value={baseAmount}
                        onChange={(e) => handleInputChange(e, 'base')}
                        placeholder={baseCurrency} />
                </SC.Column>
                <Arrow />
                <SC.Column>
                    <CurrencyRadio
                        selectedCurrency={targetCurrency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, 'target')} 
                        highlight={notification.message === 'Выберите валюту'}/>
                    <Input
                        value={targetAmount}
                        onChange={(e) => handleInputChange(e, 'target')}
                        placeholder={targetCurrency} />
                </SC.Column>
            </SC.Wrapper>
            <SC.Column>
                {rate && (
                    <SC.Message>
                        1 {baseCurrency} = {rate} {targetCurrency}
                    </SC.Message>
                )}
                <Button className='primary' onClick={convertSelectedCurrency}>Конвертировать</Button>
                {notification.message && (
                    <SC.Message className={notification.error ? 'error' : ''}>
                        {notification.message}
                    </SC.Message>
                )}
            </SC.Column>
        </SC.Container>
    )
}