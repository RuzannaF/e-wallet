export const transactionTemplates = {
    add: {
        title: 'Пополнение',
        getDateText: (formattedDate) => formattedDate,
        getCurrencyText: (transaction) => `+${transaction.addCurrency} ${transaction.currency}`,
    },
    convert: {
        title: 'Конвертация',
        getDateText: (formattedDate, transaction) =>
            `${formattedDate} по курсу 1 ${transaction.baseCurrency} = ${Math.ceil(transaction.rates * 100) / 100} ${transaction.targetCurrency}`,
        getCurrencyText: (transaction) => `+${transaction.targetAmount} ${transaction.targetCurrency}`,
    }
}