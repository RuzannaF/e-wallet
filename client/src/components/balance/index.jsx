import { useSelector } from "react-redux"
import { BalanceItem } from "./balanceItem"
import * as SC from "./styles"

export const Balance = () => {
    const { balance } = useSelector((state) => state.balance)

    return  (
        <SC.BalanceContainer>
            {balance && Object.entries(balance).map(([currency, value]) => (
                <BalanceItem key={currency} currency={currency} value={value} />
            ))}
        </SC.BalanceContainer>
    )
}