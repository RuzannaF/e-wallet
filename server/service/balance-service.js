const BalanceModel = require('../models/balance-model');
const transactionModel = require('../models/transaction-model');
const CurrencyService = require('./currency-service');
const transactionService = require('./transaction-service');


class BalanceService {

    async addBalance(userId, currency, amountToAdd) {
        const balanceData = await BalanceModel.findOne({ user: userId })
        if (balanceData) {
            const currentBalance  = balanceData[currency]
            if (amountToAdd <= 0) {
                throw new Error('Нельзя пополнить баланс на 0');
            }
            if (!currency) {
                throw new Error('Не выбрана валюта');
            }
            balanceData[currency] = currentBalance + Number(amountToAdd)
            return await balanceData.save();
        }
    } 
    async convertCurrency(baseCurrency, targetCurrency, amountToBuy, userId) {
        try {
            
            const currencyRates = await CurrencyService.getCurrencyRates(baseCurrency, targetCurrency);
            
            
            const balanceData = await BalanceModel.findOne({ user: userId });
            if (!balanceData) {
                throw new Error('Баланс пользователя не найден');
            }

            
            const baseAmount = balanceData[baseCurrency];
            const requiredBaseAmount = amountToBuy / currencyRates;
            if (baseAmount >= requiredBaseAmount) {
                
                balanceData[baseCurrency] -= requiredBaseAmount;
                balanceData[targetCurrency] += amountToBuy;
                await balanceData.save();
                await transactionService.convertationTransaction(userId, baseCurrency, targetCurrency, requiredBaseAmount, amountToBuy, currencyRates)
                return { success: true, balance: balanceData };
            } else {
                const errorMessage = `Недостаточно валюты для конвертации. Курс: 1 ${baseCurrency} = ${currencyRates} ${targetCurrency}. Баланс: ${baseAmount} ${baseCurrency}`;
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            console.error('ошибка', error);
            throw error;
        }
    }

    async getUserBalance(userId) {
        const balance = await BalanceModel.findOne({ user: userId })
        return balance;
    }
}

module.exports = new BalanceService();