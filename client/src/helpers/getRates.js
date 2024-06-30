import axios from 'axios';

export const getRates = (async ({ base: baseCurrency, target: targetCurrency }) => {
    console.log(baseCurrency, targetCurrency)
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_uxrU3VolOLAaPnWrOhTBebNABoSz1vHD7YE7jKsc&currencies=${targetCurrency.toUpperCase()}&base_currency=${baseCurrency.toUpperCase()}`)
    const dataRates = Number(response.data.data[targetCurrency.toUpperCase()])
    return dataRates
})