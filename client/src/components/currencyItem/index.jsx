

export const CurrencyItem = ({ wallet }) => {
    return (
        <Container>
            <span>{wallet.currency}</span>
            <span>{wallet.balance}</span>
        </Container>
    )
}