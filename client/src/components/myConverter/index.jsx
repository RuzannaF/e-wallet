import { useEffect, useState } from "react";
import { Input } from '../ui/input';
import { CurrencyRadio } from '../сurrencyRadio';
import { getRates } from '../../helpers/getRates';
import { getAllRates } from '../../helpers/getAllRates'
import * as SC from './styles';

export const MyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState(null)
    const [targetCurrency, setTargetCurrency] = useState(null)

    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')

    const [rates, setRates] = useState(null)

    const [notification, setNotification] = useState({ message: null, error: false })

    const fetchAllRates = async () => {
        const newRates = await getAllRates()
        setRates(newRates)
        console.log(newRates)
    }

    const resetAmounts = () => {
        setBaseAmount('')
        setTargetAmount('')
    }

    const bothCurrencySelected = baseCurrency && targetCurrency

    // useEffect(() => {
    //     const fetchRates = async () => {
    //         if (!bothCurrencySelected) return

    //         const newRates = await getRates(baseCurrency, targetCurrency)
    //         setRates(newRates)

    //         if (notification.message === 'Выберите валюту') {
    //             setNotification({ message: null, error: false })
    //         }
    //     }

    //     fetchRates()
    // }, [baseCurrency, targetCurrency])

    useEffect(() => {
        fetchAllRates()
 
        const interval = setInterval(() => {
             fetchAllRates()
             console.log('fetch')
        }, 5 * 60 * 1000)
 
        return () => clearInterval(interval)
     }, [])

    const handleInputChange = (e, setState) => {
        setState(e.target.value)
    }

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
                        onChange={(e) => handleInputChange(e, setBaseAmount)} />
                </SC.Column>
                <SC.Column>
                    <CurrencyRadio
                        selectedCurrency={targetCurrency}
                        setSelectedCurrency={(currency) => handleCurrencyChange(currency, 'target')} />
                    <Input
                        value={targetAmount}
                        onChange={(e) => handleInputChange(e, setTargetAmount)} />
                </SC.Column>
            </SC.Wrapper>
            {rates && bothCurrencySelected && (
                <SC.Message>
                    1 {baseCurrency} = {rates[baseCurrency.toUpperCase()][targetCurrency.toUpperCase()]} {targetCurrency}
                </SC.Message>
            )}
            {notification.message && (
                <SC.Message className={notification.error ? 'error' : ''}>
                    {notification.message}
                </SC.Message>
            )}
        </SC.Container>
    )
}