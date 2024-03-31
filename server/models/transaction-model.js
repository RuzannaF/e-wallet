const {Schema, model} = require('mongoose');

const TransactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    transactions: { type: Array, default: [] }
})

module.exports = model('Transaction', TransactionSchema);
