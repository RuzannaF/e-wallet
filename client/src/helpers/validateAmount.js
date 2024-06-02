
export const validateAmount = (amount) => {
    if (amount === '') return true
    const numberRegex = /^\d+(\.\d+)?$/
    return numberRegex.test(Number(amount))
}