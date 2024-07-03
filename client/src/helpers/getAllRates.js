import axios from 'axios';

const API_KEY = 'fca_live_uxrU3VolOLAaPnWrOhTBebNABoSz1vHD7YE7jKsc'
const CURRENCIES = ['USD', 'EUR', 'CAD', 'CHF']

const getRates = async (baseCurrency) => {
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${CURRENCIES.join(',')}&base_currency=${baseCurrency}`)
    return response.data.data
}

export const getAllRates = async () => {
    const baseCurrencies = ['USD', 'EUR', 'CAD', 'CHF']
    
    const requests = baseCurrencies.map(base => getRates(base))
    
    const results = await Promise.all(requests)
    
    const rates = baseCurrencies.reduce((acc, base, index) => {
        acc[base] = results[index]
        return acc
    }, {})

    return rates
}