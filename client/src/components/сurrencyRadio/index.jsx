import * as SC from "./styles"

export const CurrencyRadio = ({ selectedCurrency, setSelectedCurrency, highlight }) => {

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency)
    }

    console.log(highlight)

    return (
        <SC.RadioContainer>
            <SC.RadioItem
                checked={selectedCurrency === 'usd'}
                onClick={() => handleCurrencyChange('usd')}
                highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === 'usd'}>usd</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'cad'}
                onClick={() => handleCurrencyChange('cad')}
                highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === 'cad'}>cad</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'eur'}
                onClick={() => handleCurrencyChange('eur')}
                highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === 'eur'}>eur</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'chf'}
                onClick={() => handleCurrencyChange('chf')}
                highlight={highlight}
            ><SC.StyledText checked={selectedCurrency === 'chf'}>chf</SC.StyledText></SC.RadioItem>
        </SC.RadioContainer>
    )
}