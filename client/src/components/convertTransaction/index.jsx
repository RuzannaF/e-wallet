import { useSelector } from "react-redux"
import { formatDate } from "../../helpers/formatDate"
import * as SC from './styles'

export const ConvertTransaction = ({ index }) => {
    const transaction = useSelector((state) => state.balance.transactions[index])

    const formattedDate = formatDate(transaction.transactionDate)
    
    return (
        <SC.Container>
            <SC.Title>Конвертация</SC.Title>
            <SC.Date>{formattedDate} по курсу 1 {transaction.baseCurrency} = {Math.ceil(transaction.rates * 100) / 100} {transaction.targetCurrency}</SC.Date>
            <SC.Currency>+{transaction.targetAmount} {transaction.targetCurrency} </SC.Currency>
        </SC.Container>
    )
}