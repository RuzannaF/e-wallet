import * as SC from "./styles"

export const CurrencyRadio = ({ selectedCurrency, setSelectedCurrency }) => {

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency)
    }

    return (
        <SC.RadioContainer>
            <SC.RadioItem
                checked={selectedCurrency === 'usd'}
                onClick={() => handleCurrencyChange('usd')}
            ><SC.StyledText checked={selectedCurrency === 'usd'}>usd</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'cad'}
                onClick={() => handleCurrencyChange('cad')}
            ><SC.StyledText checked={selectedCurrency === 'cad'}>cad</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'eur'}
                onClick={() => handleCurrencyChange('eur')}
            ><SC.StyledText checked={selectedCurrency === 'eur'}>eur</SC.StyledText></SC.RadioItem>
            <SC.RadioItem
                checked={selectedCurrency === 'chf'}
                onClick={() => handleCurrencyChange('chf')}
            ><SC.StyledText checked={selectedCurrency === 'chf'}>chf</SC.StyledText></SC.RadioItem>
        </SC.RadioContainer>
    )
}