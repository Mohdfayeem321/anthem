const Customer = require('../models/tbl_Customers.model');

// Get all customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('membershipID');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('membershipID');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { firstName, lastName, email, contactNumber, membershipID, status } = req.body;
    try {
        const newCustomer = await Customer.create({
            firstName,
            lastName,
            email,
            contactNumber,
            membershipID,
            status
        });
        console.log(newCustomer); // Log customer data for debugging
        // Return the newly created customer
        res.status(201).json({ status: true, data: newCustomer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
