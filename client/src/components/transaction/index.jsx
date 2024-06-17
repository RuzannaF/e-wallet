import { formatDate } from "../../helpers/formatDate";
import { transactionTemplates } from "./transactionTemplates";
import { TRANSACTION_ADD, TRANSACTION_CONVERT } from "../../constants";
import * as SC from './styles';

export const Transaction = ({ transaction }) => {
    const formattedDate = formatDate(transaction.transactionDate)
    const transactionType = transaction.currency ? TRANSACTION_ADD : TRANSACTION_CONVERT
    const template = transactionTemplates[transactionType]

    return (
        <SC.Container>
            <SC.Title>{template.title}</SC.Title>
            <SC.Date>{template.getDateText(formattedDate, transaction)}</SC.Date>
            <SC.Currency>{template.getCurrencyText(transaction)}</SC.Currency>
        </SC.Container>
    )
}