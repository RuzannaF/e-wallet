export const validateAmount = (amount) => {
    if (amount.toString().trim() === '') return { isValid: false, message: "Сумма не должна быть пустой строкой" }

    const numberRegex = /^\d+(\.\d+)?$/

    if (!numberRegex.test(amount)) return { isValid: false, message: "Сумма не должна содержать символы" }

    const number = parseFloat(amount)
    if (number === 0) return { isValid: false, message: "Сумма не должна быть равна нулю" }

   // const decimal = amount.toString().split('.')[1]
   // if (decimal && /^[0]+$/.test(decimal)) return { isValid: false, message: "Сумма не может заканчиваться нулем в дробной части" }

    return { isValid: true }
}