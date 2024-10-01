const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    membershipName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
