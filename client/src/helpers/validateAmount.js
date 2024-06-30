export const validateAmount = (amount) => {
    if (amount.toString().trim() === '') return { isValid: false, message: "Сумма не должна быть пустой строкой" }

    const numberRegex = /^\d+(\.\d+)?$/

    if (!numberRegex.test(amount)) return { isValid: false, message: "Сумма не должна содержать символы" }

    const number = parseFloat(amount)
    if (number === 0) return { isValid: false, message: "Сумма не должна быть равна нулю" }

    return { isValid: true }
}