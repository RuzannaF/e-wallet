import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTransactions } from "../../redux/slices/balanceSlice"
import { ConvertTransaction } from "../../components/convertTransaction"
import { AddTransaction } from "../../components/addTransaction"
import { AuthWarning } from "../../components/authWarning"
import { Loader } from "../../components/loader"
import * as SC from './styles'

export const History = () => {
    const { loading } = useSelector((state) => state.auth)
    const { id, isActivated } = useSelector((state) => state.auth.user)
    const { transactions } = useSelector((state) => state.balance)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions({ userId: id }))
    }, [id, dispatch])

    if ((!id || !isActivated) && !loading) {
        return <AuthWarning />
    }
    
    return loading || !id ? (
        <Loader />
    ) : (
        <SC.Container>
            <SC.Title>История транзакций</SC.Title>
            {transactions && transactions.map(
                (transaction, index) => transaction.hasOwnProperty('rates') ? <ConvertTransaction key={index} index={index} /> : <AddTransaction key={index} index={index} />
            )}
        </SC.Container>
    )
}