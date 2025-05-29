import React from 'react';

const Reports = () => {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <div className="reports-grid">
        <div className="report-card">
          <h3>Sales Report</h3>
          <p>View detailed sales analytics</p>
        </div>
        <div className="report-card">
          <h3>Customer Report</h3>
          <p>View customer analytics</p>
        </div>
        <div className="report-card">
          <h3>Inventory Report</h3>
          <p>View inventory status</p>
        </div>
      </div>
    </div>
  );
};

export default Reports; 