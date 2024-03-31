import $api from "../http"

export const balanceApi = {
    async getBalance({ userId }) {
        try {
            const response = await $api.get(`/getBalance?userId=${userId}`)
            return response.data
        } catch (error) {
            throw error
        }
    },
    async getTransactions({ userId }) {
        try {
            const response = await $api.get(`/getTransactions?userId=${userId}`)
            return response.data
        } catch (error) {
            throw error
        }
    },
    async addBalance({ userId, currency, amountToAdd }) {
        try {
            const response = await $api.post('/addBalance', { userId, currency, amountToAdd })
            return response.data
        } catch (error) {
            throw error
        }
    },
    async convertCurrency({ baseCurrency, targetCurrency, amountToBuy, userId }) {
        try {
            const response = await $api.post('/convertCurrency', { baseCurrency, targetCurrency, amountToBuy, userId })
            return response.data
        } catch (error) {
            throw error
        }
    }
}



