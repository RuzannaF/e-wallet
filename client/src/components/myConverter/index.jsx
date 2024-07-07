import { useEffect, useState } from "react";
import { Input } from '../ui/input';
import { CurrencyRadio } from '../сurrencyRadio';
import { getAllRates } from '../../helpers/getAllRates'
import * as SC from './styles';
import { calculateAmount } from "../../helpers/calculateAmount";
import { useSelector } from "react-redux";

export const MyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState(null)
    const [targetCurrency, setTargetCurrency] = useState(null)

    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')

    const [rates, setRates] = useState(null)

    const [notification, setNotification] = useState({ message: null, error: false })

    const bothCurrencySelected = baseCurrency && targetCurrency
    const rate = rates && bothCurrencySelected ? rates[baseCurrency.toUpperCase()][targetCurrency.toUpperCase()] : null

    const { balance } = useSelector((state) => state.balance)

    const fetchAllRates = async () => {
        const newRates = await getAllRates()
        setRates(newRates)
    }

    const getConvertedAmount = (type, amount) => {
        const convertedAmount = rate ? calculateAmount(rate, type, amount) : ''
        return convertedAmount
    }

    const resetAmounts = () => {
        setBaseAmount('')
        setTargetAmount('')
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

    useEffect (() => {
        
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

    return (
        <SC.Container>
            My Converter
            <br />
            <br />
            <SC.Wrapper>
                <SC.Column>
                    <CurrencyRadio
                        selectedCurrency={baseCurrency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, 'base')} />
                    <Input
                        value={baseAmount}
                        onChange={(e) => handleInputChange(e, 'base')} />
                </SC.Column>
                <SC.Column>
                    <CurrencyRadio
                        selectedCurrency={targetCurrency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, 'target')} />
                    <Input
                        value={targetAmount}
                        onChange={(e) => handleInputChange(e, 'target')} />
                </SC.Column>
            </SC.Wrapper>
            {rate && (
                <SC.Message>
                    1 {baseCurrency} = {rate} {targetCurrency}
                </SC.Message>
            )}
            <br/>
            {notification.message && (
                <SC.Message className={notification.error ? 'error' : ''}>
                    {notification.message}
                </SC.Message>
            )}
        </SC.Container>
    )
}