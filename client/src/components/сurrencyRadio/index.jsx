import { CURRENCY_USD, CURRENCY_EUR, CURRENCY_CHF, CURRENCY_CAD } from "../../constants"
import * as SC from "./styles"

export const CurrencyRadio = ({ selectedCurrency, setSelectedCurrency, highlight }) => {

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency)
    }

    return (
        <SC.RadioContainer>
            <SC.RadioItem
                checked={selectedCurrency === CURRENCY_USD}
                onClick={() => handleCurrencyChange(CURRENCY_USD)}
                $highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === CURRENCY_USD}>usd</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === CURRENCY_CAD}
                onClick={() => handleCurrencyChange(CURRENCY_CAD)}
                $highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === CURRENCY_CAD}>cad</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === CURRENCY_EUR}
                onClick={() => handleCurrencyChange(CURRENCY_EUR)}
                $highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === CURRENCY_EUR}>eur</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === CURRENCY_CHF}
                onClick={() => handleCurrencyChange(CURRENCY_CHF)}
                $highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === CURRENCY_CHF}>chf</SC.StyledText></SC.RadioItem>
        </SC.RadioContainer>
    )
}