import { useState } from "react"
import { BalanceAdd } from "../balanceAdd";
import { TRANSACTION_ADD, TRANSACTION_CONVERT } from "../../../constants";
import * as SC from "./styles"
import { MyConverter } from "../../myConverter";


export const WalletActions = () => {
    const [currentAction, setCurrentAction] = useState(TRANSACTION_ADD)

    const changeAction = (action) => {
        setCurrentAction(action)
    }
    return (
        <SC.Container>
            <SC.ActionsRow>
               <SC.Action selected={currentAction === TRANSACTION_ADD} onClick={() => changeAction(TRANSACTION_ADD)}>Пополнить</SC.Action>
               <SC.Action selected={currentAction === TRANSACTION_CONVERT} onClick={() => changeAction(TRANSACTION_CONVERT)}>Конвертировать</SC.Action>
            </SC.ActionsRow>
            <SC.ActionItemContainer>
                {currentAction === TRANSACTION_ADD && <BalanceAdd />}
                {currentAction === TRANSACTION_CONVERT && <MyConverter />}
            </SC.ActionItemContainer>
        </SC.Container>
    )
}