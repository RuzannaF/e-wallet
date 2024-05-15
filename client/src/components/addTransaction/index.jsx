import { useSelector } from "react-redux"
import { formatDate } from "../../helpers/formatDate"
import * as SC from './styles'

export const AddTransaction = ({ index }) => {

    const formattedDate = formatDate(index.transactionDate)

    const transactionType = index.currency ? 'add' : 'convert'

    return (
        transactionType === 'add' ? (
            <SC.Container>
                <SC.Title>Пополнение</SC.Title>
                <SC.Date>{formattedDate}</SC.Date>
                <SC.Currency>+{index.addCurrency} {index.currency}</SC.Currency>
            </SC.Container>
        ) : <SC.Container>
            <SC.Title>Конвертация</SC.Title>
            <SC.Date>{formattedDate} по курсу 1 {index.baseCurrency} = {Math.ceil(index.rates * 100) / 100} {index.targetCurrency}</SC.Date>
            <SC.Currency>+{index.targetAmount} {index.targetCurrency} </SC.Currency>
        </SC.Container>
    )
}