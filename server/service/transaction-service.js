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

    async getUserTransactions(userId, transactionType, sortByDate) {
        const transactions = await TransactionModel.findOne({ user: userId })
        let filteredTransactions = transactions
    
        if (filteredTransactions) {
            if (transactionType === 'addTransaction') {
                filteredTransactions.transactions = filteredTransactions.transactions.filter(transaction => transaction.hasOwnProperty('currency'))
            } else if (transactionType === 'convertTransaction') {
                filteredTransactions.transactions = filteredTransactions.transactions.filter(transaction => transaction.hasOwnProperty('baseCurrency'))
            }
            if (sortByDate === 'newToOld') {
                filteredTransactions.transactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
            } else if (sortByDate === 'oldToNew') {
                filteredTransactions.transactions.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate))
            }
            return filteredTransactions
        }
    }
}

module.exports = new TransactionService();