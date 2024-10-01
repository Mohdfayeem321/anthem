import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerForm = () => {
    const { id } = useParams(); // Get id from URL for editing
    const navigate = useNavigate(); // To navigate after form submission
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        combinedOption: '' // Single combined option state
    });
    const [combinedOptions, setCombinedOptions] = useState([]);

    useEffect(() => {
        // Fetch combined membership/status options for dropdown
        const fetchCombinedOptions = async () => {
            // Replace this with actual API call later
            const memberships = await axios.get("http://localhost:8080/api/memberships");
            console.log(22, memberships);
            const combined = memberships.data.map(m => ([
                {
                    value: `${m._id}|Gold`, // Combining membership and status as a value
                    label: `${m.membershipName} - Gold`
                },
                {
                    value: `${m._id}|Diamond`,
                    label: `${m.membershipName} - Diamond`
                }
            ])).flat(); // Flatten the array

            setCombinedOptions(combined);
        };

        // Fetch customer data if editing
        const fetchCustomer = async () => {
            if (id) {
                const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
                setFormData(response.data);
            }
        };

        fetchCombinedOptions();
        if (id) fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("formData.combinedOption", formData.combinedOption)
        // Split the combined option into separate fields before submission
        let [membershipID, status] = formData.combinedOption.split('|');
        // membershipID = parseInt(membershipID);
        const finalData = { ...formData, membershipID, status }; // Update formData before sending it
        console.log(60, finalData)
        try {
            let response;

            // Check if we are editing an existing customer or creating a new one
            if (id) {
                response = await axios.put(`http://localhost:8080/api/customers/${id}`, finalData);
            } else {
                response = await axios.post('http://localhost:8080/api/customers', finalData);
                console.log(response.data);
            }

            // Log the response data to check what was returned from the server
            console.log(response.data);

            // Navigate back to customer list after submit
            navigate('/');
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle the error as needed
        }
    };

    return (
        <form className="customer-form" onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Customer' : 'New Customer'}</h2>

            {/* Input fields */}
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                required
            />

            {/* Single dropdown combining Membership and Status */}
            <select
                name="combinedOption"
                value={formData.combinedOption}
                onChange={handleChange}
                required
            >
                <option value="">Select Membership and Status</option>
                {combinedOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button type="submit">{id ? 'Update' : 'Create'} Customer</button>
        </form>
    );
};

export default CustomerForm;
