import { useEffect } from 'react'
import { Balance } from "../../components/balance"
import { WalletActions } from "../../components/walletActions/actionsContainer"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../../components/loader"
import { AuthWarning } from "../../components/authWarning"
import { getBalance } from "../../redux/slices/BalanceSlice"
import * as SC from './styles'

export const MyWallet = () => {
    const { loading } = useSelector((state) => state.auth)
    const { id, isActivated } = useSelector((state) => state.auth.user)
    const { balance } = useSelector((state) => state.balance)

    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(getBalance({ userId: id }))
        }
    }, [id, dispatch])

    if ((!id || !isActivated) && !loading) {
        return <AuthWarning />
    }

    return loading || !balance ? (
        <Loader />
    ) : (
        <SC.Container>
            <Balance />
            <WalletActions />
        </SC.Container>
    )
}