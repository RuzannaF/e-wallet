import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { balanceApi } from '../../api/balanceApi';

export const getBalance = createAsyncThunk(
    'balance/getUserBalance',
    async ({ userId }) => {
        return await balanceApi.getBalance({ userId });
    }
)

export const getTransactions = createAsyncThunk(
    'balance/getUserTransactions',
    async ({ userId, transactionType, sortByDate }) => {
        return await balanceApi.getTransactions({ userId, transactionType, sortByDate });
    }
)

export const addBalance = createAsyncThunk(
    'balance/addUserBalance',
    async ({ userId, currency, amountToAdd }) => {
        return await balanceApi.addBalance({ userId, currency, amountToAdd });
    }
)

export const convertCurrency = createAsyncThunk(
    'balance/convertUserCurrency',
    async ({ baseCurrency, targetCurrency, amountToBuy, userId }) => {
        return await balanceApi.convertCurrency({ baseCurrency, targetCurrency, amountToBuy, userId });
    }
)

const initialState = {
    balance: null,
    loading: true,
    transactions: [],
}

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loading = false;
                const { usd, chf, cad, eur } = action.payload;
                state.balance = { usd, chf, cad, eur };
            })
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                const { transactions } = action.payload
                state.transactions = transactions
            })
            .addCase(addBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBalance.fulfilled, (state, action) => {
                state.loading = false;
                const { usd, chf, cad, eur } = action.payload.updatedBalance;
                state.balance = { usd, chf, cad, eur };
            })
            .addCase(convertCurrency.pending, (state) => {
                state.loading = true;
            })
            .addCase(convertCurrency.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                const { usd, chf, cad, eur } = action.payload.balance;
                state.balance = { usd, chf, cad, eur };
            })
    },
});

export default balanceSlice.reducer;
