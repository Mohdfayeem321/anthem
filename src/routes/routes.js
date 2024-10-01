const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController');
const membershipsController = require('../controllers/membershipsController');

// CRUD Routes
router.get('/memberships', membershipsController.getMemberships);
router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
