
export const calculateAmount = (rates, currencyType, amount) => {
    if (currencyType === 'base') {
        const newAmount = Math.floor(amount * rates * 1000) / 1000
        return newAmount
    } 
    const newAmount = Math.ceil(amount / rates * 1000) / 1000
    return newAmount
}