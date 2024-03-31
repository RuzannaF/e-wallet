import { useSelector } from "react-redux"
import { formatDate } from "../../helpers/formatDate"
import * as SC from './styles'

export const AddTransaction = ({ index }) => {
    const transaction = useSelector((state) => state.balance.transactions[index])

    const formattedDate = formatDate(transaction.transactionDate)
    return (
        <SC.Container>
            <SC.Title>Пополение</SC.Title>
            <SC.Date>{formattedDate}</SC.Date>
            <SC.Currency>+{transaction.addCurrency} {transaction.currency}</SC.Currency>
        </SC.Container>
    )
}