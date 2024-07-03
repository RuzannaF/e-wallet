import axios from 'axios';

const API_KEY = 'fca_live_uxrU3VolOLAaPnWrOhTBebNABoSz1vHD7YE7jKsc'

export const getRates = (async (baseCurrency, targetCurrency) => {
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${targetCurrency.toUpperCase()}&base_currency=${baseCurrency.toUpperCase()}`)
    const dataRates = Number(response.data.data[targetCurrency.toUpperCase()])
    return dataRates
})