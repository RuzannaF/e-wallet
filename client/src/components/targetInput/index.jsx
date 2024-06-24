import { useSelector } from "react-redux";
import { CurrencyInput } from "../currencyInput";
import { validateAmount } from "../../helpers/validateAmount";
import { calculateAmount } from "../../helpers/calculateAmount";

export const TargetInput = ({ target, setTarget, base, setBase, rates, setRates, notification, setNotification }) => {

    const bothCurrencySelected = target.currency && base.currency

    const { balance } = useSelector((state) => state.balance)

    const changeAmount = (e) => {
        const amount = e.target.value
        setTarget(prevState => ({
            ...prevState,
            amount: amount
        })) 
        if (!bothCurrencySelected) {
            return setNotification({ message: 'Выберите валюту', error: true })
        }
        const validatedAmount = e.target.value ? validateAmount(amount) : { isValid: false }
        const newBaseAmount = validatedAmount.isValid ? calculateAmount(rates, 'base', amount) : ''
        if (newBaseAmount && newBaseAmount > balance[base.currency]) {
            setNotification({ message: 'Недостаточно валюты для перевода', error: true })
        }
        setBase(prevState => ({
            ...prevState,
            amount: newBaseAmount
        }))
    }

    const handleCurrencyChange = (currency) => {
        setTarget(prevState => ({
            ...prevState,
            currency: currency
        }))
        if (currency === base.currency) {
            setBase({ amount: '', currency: '' })
            setTarget(prevState => ({
                ...prevState,
                amount: ''
            }))
            setRates('')
        }
    }

    return (
        <CurrencyInput
            currency="target"
            selectedCurrency={target.currency}
            setSelectedCurrency={handleCurrencyChange}
            amount={target.amount}
            onChange={changeAmount}
            placeholder={target.currency}
            notification={notification}
        />
    )
}