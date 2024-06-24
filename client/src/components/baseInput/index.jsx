import { useSelector } from "react-redux";
import { CurrencyInput } from "../currencyInput";
import { validateAmount } from "../../helpers/validateAmount";
import { calculateAmount } from "../../helpers/calculateAmount";


export const BaseInput = ({ target, setTarget, base, setBase, rates, setRates, notification, setNotification }) => {

    const bothCurrencySelected = target.currency && base.currency

    const { balance } = useSelector((state) => state.balance)

    const changeAmount = (e) => {
        const amount = e.target.value
        setBase(prevState => ({
            ...prevState,
            amount: amount
        }))
        if (!bothCurrencySelected) {
            return setNotification({ message: 'Выберите валюту', error: true })
        }
        const validatedAmount = e.target.value ? validateAmount(amount) : { isValid: false }
        const newTargetAmount = validatedAmount.isValid ? calculateAmount(rates, 'target', amount) : ''
        if (newTargetAmount && amount > balance[base.currency]) {
            setNotification({ message: 'Недостаточно валюты для перевода', error: true })
        }
        setTarget(prevState => ({
            ...prevState,
            amount: newTargetAmount
        }))
    }

    const handleCurrencyChange = (currency) => {
        setBase(prevState => ({
            ...prevState,
            currency: currency
        }))
        if (currency === target.currency) {
            setTarget({ amount: '', currency: '' })
            setBase(prevState => ({
                ...prevState,
                amount: ''
            }))
            setRates('')
        }
    }

    return (
        <CurrencyInput
            currency="base"
            selectedCurrency={base.currency}
            setSelectedCurrency={handleCurrencyChange}
            amount={base.amount}
            onChange={changeAmount}
            placeholder={base.currency}
            notification={notification}
        />
    )
}