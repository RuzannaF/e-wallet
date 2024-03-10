import { currency } from "../../../currency"
import { Container } from "../../container"

export const BalanceAdd = () => {

    return (
        <Container>
            <select>
                {currency.map((item) => <option>{item}</option>)}
            </select>
            <input type='number' placeholder='Введите сумму пополнения' />
        </Container>
    )
}