const axios = require('axios');

class CurrencyService {

    async getCurrencyRates(baseCurrency, targetCurrency) {
        const base = baseCurrency.toUpperCase()
        const target = targetCurrency.toUpperCase()
        try {
            const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_uxrU3VolOLAaPnWrOhTBebNABoSz1vHD7YE7jKsc&currencies=${target}&base_currency=${base}`);
            const data = response.data.data[target];
            return data;
        } catch (error) {
            console.error('Не удалось получить курсы валют', error);
            throw error;
        }
    }
}

module.exports = new CurrencyService();

