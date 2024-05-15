const balanceService = require('../service/balance-service');
const transactionService = require('../service/transaction-service');

const ApiError = require('../exceptions/api-error');

class BalanceController {
    async addBalance(req, res, next) {
        try {
            const { userId, currency, amountToAdd } = req.body;
            const updatedBalance = await balanceService.addBalance(userId, currency, amountToAdd);
            const updatedTransactions = await transactionService.addBalanceTransaction(userId, currency, amountToAdd);
            res.json({ updatedBalance, updatedTransactions });
        } catch(e) {
            next(e);
        }
    }

    async convertCurrency(req, res,next) {
        try {
            const { baseCurrency, targetCurrency, amountToBuy, userId } = req.body;
            const  updatedBalance = await balanceService.convertCurrency(baseCurrency, targetCurrency, amountToBuy, userId)
            res.json(updatedBalance);          
        } catch(e) {
            next(e);
        }
    }

    async getBalance(req, res, next) {
        try {
            const userId = req.query.userId;
            const balance = await balanceService.getUserBalance(userId);
            return res.json(balance);
        } catch (e) {
            next(e);
        }
    }

    async getTransactions(req, res, next) {
        try {
            const { userId, transactionType, sortByDate } = req.query;
            const transactions = await transactionService.getUserTransactions(userId, transactionType, sortByDate);
            return res.json(transactions);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BalanceController();