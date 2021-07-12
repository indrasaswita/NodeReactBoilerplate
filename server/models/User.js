

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CashcategorySchema = require('./Cashcategory');
const { CashtypeSchema } = require('./Cashtype');


// create Schemaa
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    cashtypes: [CashtypeSchema],
}, {
    timestamps: true,
});

const User = mongoose.model('users', UserSchema);
module.exports = {
    User,
    UserSchema,
};