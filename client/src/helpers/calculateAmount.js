
export const calculateAmount = (rates, currencyType, amount) => {
    if (currencyType === 'target') {
        const targetAmount = Math.ceil(amount * rates * 100) / 100
        return targetAmount
    } else {
        const baseAmount = Math.ceil(amount / rates * 100) / 100
        return baseAmount
    }
}