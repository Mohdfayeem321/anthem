import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch the customers when the component is mounted
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customers');
                console.log("response.data", response.data)
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/customers/${id}`);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    return (
        <div className="customer-list">
            <h2>Customer List</h2>
            <Link to="http://localhost:3000/api/customers" className="add-new-btn">New Customer</Link>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Membership</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.contactNumber}</td>
                                <td>{customer.status}</td>
                                <td>{customer.membershipID.membershipName}</td>
                                <td>
                                    <Link to={`http://localhost:3000/api/customers/${customer._id}`} className="edit-btn">Edit</Link>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(customer._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
