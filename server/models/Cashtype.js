


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashtypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    cashcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cashcategory',
    },
}, {
    timestamps: true,
});

const Cashtype = mongoose.model('cashtype', CashtypeSchema);
module.exports = {
    Cashtype,
    CashtypeSchema,
};