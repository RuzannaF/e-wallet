export const createConverterTemplates = (baseCurrency, setBaseCurrency, targetCurrency, setTargetCurrency) => ({
    base: {
        setCurrency: setBaseCurrency,
        oppositeCurrency: targetCurrency,
        setOppositeCurrency: setTargetCurrency,
        oppositeType: 'target',
    },
    target: {
        setCurrency: setTargetCurrency,
        oppositeCurrency: baseCurrency,
        setOppositeCurrency: setBaseCurrency,
        oppositeType: 'base',
    }
})