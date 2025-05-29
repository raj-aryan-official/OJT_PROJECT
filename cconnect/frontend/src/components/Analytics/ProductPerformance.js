import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductPerformance = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        backgroundColor: 'rgba(0, 123, 255, 0.8)',
        borderColor: '#007bff',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  };

  return (
    <div className="product-performance">
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="product-stats">
        {data.map(item => (
          <div key={item._id} className="product-stat">
            <h4>{item.name}</h4>
            <div className="stat-details">
              <p>Sales: ${item.sales}</p>
              <p>Units Sold: {item.unitsSold}</p>
              <p>Stock: {item.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPerformance; 