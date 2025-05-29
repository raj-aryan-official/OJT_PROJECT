import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeAnalytics = ({ data }) => {
  const chartData = {
    labels: data.hourlyData.map(item => item.hour),
    datasets: [
      {
        label: 'Orders',
        data: data.hourlyData.map(item => item.orders),
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4
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
        beginAtZero: true
      }
    }
  };

  return (
    <div className="time-analytics">
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
      <div className="time-stats">
        <div className="stat-card">
          <h4>Peak Hours</h4>
          <p className="stat-value">{data.peakHours.join(', ')}</p>
        </div>
        <div className="stat-card">
          <h4>Average Order Time</h4>
          <p className="stat-value">{data.averageOrderTime} min</p>
        </div>
        <div className="stat-card">
          <h4>Busiest Day</h4>
          <p className="stat-value">{data.busiestDay}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeAnalytics; 