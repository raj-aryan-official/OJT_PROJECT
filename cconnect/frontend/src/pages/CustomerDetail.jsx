import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetail = () => {
  const { id } = useParams();

  return (
    <div className="customer-detail">
      <h1>Customer Details</h1>
      <div className="customer-info">
        <p>Customer ID: {id}</p>
        {/* Add more customer details here */}
      </div>
    </div>
  );
};

export default CustomerDetail; 