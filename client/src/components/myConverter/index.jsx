import { useState } from "react";
import { Input } from '../ui/input';
import { CurrencyRadio } from '../сurrencyRadio';
import { createConverterTemplates } from "./converterTemplates";
import { getRates } from '../../helpers/getRates';
import * as SC from './styles';

export const MyConverter = () => {
    const [baseCurrency, setBaseCurrency] = useState(null)
    const [targetCurrency, setTargetCurrency] = useState(null)

    const [baseAmount, setBaseAmount] = useState('')
    const [targetAmount, setTargetAmount] = useState('')

    const [rates, setRates] = useState(null)

    const templates = createConverterTemplates(baseCurrency, setBaseCurrency, targetCurrency, setTargetCurrency)

    const resetAmounts = () => {
        setBaseAmount('')
        setTargetAmount('')
    }

    const handleInputChange = (e, setState) => {
        setState(e.target.value)
    }

    const handleCurrencyChange = async (currency, type) => {
        const { setCurrency, oppositeCurrency, setOppositeCurrency, oppositeType } = templates[type]

        setCurrency(currency)
        console.log(`${type + 'input'} : ${currency}`)

        if (currency === oppositeCurrency) {
            setOppositeCurrency(null)
            resetAmounts()
            return
        }

        if (oppositeCurrency) {
            const newRates = await getRates({ [type]: currency, [oppositeType]: oppositeCurrency })
            setRates(newRates)
            console.log(newRates)
        }
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
        </SC.Container>
    )
}