import { useState } from "react"
import { BalanceAdd } from "../balanceAdd";
import { CurrencyConverter } from "../currencyConverter";
import * as SC from "./styles"


export const WalletActions = () => {
    const [currentAction, setCurrentAction] = useState('add');

    const changeAction = (action) => {
        setCurrentAction(action)
    }
    return (
        <SC.Container>
            <SC.ActionsRow>
               <SC.Action selected={currentAction === 'add'} onClick={() => changeAction('add')}>Пополнить</SC.Action>
               <SC.Action selected={currentAction === 'convert'} onClick={() => changeAction('convert')}>Конвертировать</SC.Action>
            </SC.ActionsRow>
            <SC.ActionItemContainer>
                {currentAction === 'add' && <BalanceAdd />}
                {currentAction === 'convert' && <CurrencyConverter />}
            </SC.ActionItemContainer>
        </SC.Container>
    )
}