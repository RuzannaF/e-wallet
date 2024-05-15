
export const calculateAmount = (rates, currencyType, amount) => {
    if (currencyType === 'target') {
        const targetAmount = Math.floor(amount * rates * 1000) / 1000
        return targetAmount
    } else {
        const baseAmount = Math.ceil(amount / rates * 1000) / 1000
        return baseAmount
    }
}