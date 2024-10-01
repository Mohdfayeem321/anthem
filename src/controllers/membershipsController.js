const Membership = require('../models/tbl_Memberships.model');

// Get all customers
exports.getMemberships = async (req, res) => {
    try {
        const Memberships = await Membership.find();
        res.status(200).json(Memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};