import { formatDate } from "../../helpers/formatDate";
import { transactionTemplates } from "./transactionTemplates";
import * as SC from './styles';

export const AddTransaction = ({ transaction }) => {
    const formattedDate = formatDate(transaction.transactionDate)
    const transactionType = transaction.currency ? 'add' : 'convert'
    const template = transactionTemplates[transactionType]

    return (
        <SC.Container>
            <SC.Title>{template.title}</SC.Title>
            <SC.Date>{template.getDateText(formattedDate, transaction)}</SC.Date>
            <SC.Currency>{template.getCurrencyText(transaction)}</SC.Currency>
        </SC.Container>
    )
}