const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    contactNumber: {
        type: String,
        required: true
    },
    membershipID: {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
        required: true
    },
    status: {
        type: String,
        enum: ['Gold', 'Diamond'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
