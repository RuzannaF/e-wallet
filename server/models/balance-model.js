const {Schema, model} = require('mongoose');

const BalanceSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    usd: {type: Number, default: 0},
    eur: {type: Number, default: 0},
    cad: {type: Number, default: 0},
    chf: {type: Number, default: 0},
})

module.exports = model('Balance', BalanceSchema);
