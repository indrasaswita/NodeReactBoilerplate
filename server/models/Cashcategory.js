

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const CashcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const Cashcategory = mongoose.model('cashcategory', CashcategorySchema);
module.exports = {
    Cashcategory,
    CashcategorySchema,
};