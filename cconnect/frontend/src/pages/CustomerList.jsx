import React from 'react';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  // Mock customer data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  return (
    <div className="customer-list">
      <h1>Customers</h1>
      <div className="customer-grid">
        {customers.map(customer => (
          <div key={customer.id} className="customer-card">
            <h3>{customer.name}</h3>
            <p>{customer.email}</p>
            <Link to={`/customers/${customer.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList; 