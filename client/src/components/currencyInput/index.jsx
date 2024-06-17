import { Input } from "../ui/input";
import { CurrencyRadio } from "../сurrencyRadio";

export const CurrencyInput = ({ currency, selectedCurrency, setSelectedCurrency, amount, onChange, placeholder, notification }) => {

    const handleChange = (e) => {
        onChange(e)
    }

    return (
        <>
            <CurrencyRadio
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                highlight={notification.message === 'Выберите валюту'}
            />
            <Input
                type="text"
                name={currency + 'Amount'}
                placeholder={placeholder}
                value={amount}
                onChange={handleChange} 
                className={`smallInput ${notification.error && notification.message ? 'errorInput' : ''}`}
            />
        </>
    )
}