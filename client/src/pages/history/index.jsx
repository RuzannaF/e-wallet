import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTransactions } from "../../redux/slices/balanceSlice"
import { Transaction } from "../../components/transaction"
import { AuthWarning } from "../../components/authWarning"
import { Loader } from "../../components/loader"
import { Select } from "../../components/ui/select"
import * as SC from './styles'

export const History = () => {
    const [sortByDate, setSortByDate] = useState("oldToNew");
    const [transactionType, setTransactionType] = useState("all");
    const { loading } = useSelector((state) => state.auth)
    const { id, isActivated } = useSelector((state) => state.auth.user)
    const { transactions } = useSelector((state) => state.balance)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions({ userId: id, transactionType:  transactionType, sortByDate: sortByDate}))
    }, [id, sortByDate, transactionType, dispatch])

    if ((!id || !isActivated) && !loading) {
        return <AuthWarning />
    }
    
    return loading || !id ? (
        <Loader />
    ) : (
        <SC.Container>
            <SC.Title>История транзакций</SC.Title>
            <Select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
                <option value="oldToNew">От старых к новым</option>
                <option value="newToOld">От новых к старым</option>
            </Select>
            <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                <option value="all">Все</option>
                <option value="convertTransaction">Конвертация</option>
                <option value="addTransaction">Пополнение</option>
            </Select>
            {transactions && transactions.map(
                (transaction) => <Transaction key={transaction.transactionDate} transaction={transaction} />
            )}
        </SC.Container>
    )
}