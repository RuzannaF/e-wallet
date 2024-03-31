import { Usd } from '../../../svg/usd.jsx';
import { Cad } from '../../../svg/cad.jsx';
import { Eur } from '../../../svg/eur.jsx';
import { Chf } from '../../../svg/chf.jsx';
import * as SC from "./styles"

const CurrencyIcons = {
    usd: Usd,
    cad: Cad,
    eur: Eur,
    chf: Chf,
};


export const BalanceItem = ({ currency, value }) => {

    const CurrencyIcon = CurrencyIcons[currency]

    return (
        <SC.BalanceItem>
            <SC.IconContainer>
                <CurrencyIcon />
            </SC.IconContainer>
            <SC.CurrencyText>{currency.toUpperCase()}:</SC.CurrencyText>
            <SC.CurrencyText>{Math.ceil(value * 100) / 100}</SC.CurrencyText>
        </SC.BalanceItem>
    )
}