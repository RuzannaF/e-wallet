const TransactionModel = require('../models/transaction-model');

class TransactionService {

    async addBalanceTransaction(userId, currency, amountToAdd) {
        const transactionData = await TransactionModel.findOne({ user: userId })
        if (transactionData) {
            const transaction = {
                currency: currency,
                addCurrency: amountToAdd,
                transactionDate: new Date()
            }
            transactionData.transactions.push(transaction)
            return await transactionData.save();
        }
    }

    async convertationTransaction(userId, base, target, requiredBaseAmount, amountToBuy, currencyRates) {
        const transactionData = await TransactionModel.findOne({ user: userId })
        if (transactionData) {
            const transaction = {
                baseCurrency: base,
                targetCurrency: target,
                baseAmount: requiredBaseAmount,
                rates: currencyRates,
                targetAmount: amountToBuy,
                transactionDate: new Date()
            }
            transactionData.transactions.push(transaction)
            return await transactionData.save();
        }
    }

    async getUserTransactions(userId) {
        const transactions = await TransactionModel.findOne({ user: userId })
        return transactions;
    }
}

module.exports = new TransactionService();