import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SalesChart from './SalesChart';
import ProductPerformance from './ProductPerformance';
import CustomerAnalytics from './CustomerAnalytics';
import TimeAnalytics from './TimeAnalytics';
import { getShopAnalytics, getAdminAnalytics } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = user.role === 'admin' 
          ? await getAdminAnalytics(timeRange)
          : await getShopAnalytics(user.shopId, timeRange);
        setAnalytics(data);
      } catch (err) {
        setError('Error fetching analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, timeRange]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <div className="time-range-selector">
          <button
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card sales-overview">
          <h2>Sales Overview</h2>
          <SalesChart data={analytics.salesData} timeRange={timeRange} />
        </div>

        <div className="dashboard-card product-performance">
          <h2>Product Performance</h2>
          <ProductPerformance data={analytics.productPerformance} />
        </div>

        <div className="dashboard-card customer-analytics">
          <h2>Customer Analytics</h2>
          <CustomerAnalytics data={analytics.customerAnalytics} />
        </div>

        <div className="dashboard-card time-analytics">
          <h2>Time-based Analytics</h2>
          <TimeAnalytics data={analytics.timeAnalytics} />
        </div>

        {user.role === 'admin' && (
          <>
            <div className="dashboard-card platform-metrics">
              <h2>Platform Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>Total Users</h3>
                  <p className="metric-value">{analytics.userGrowth.total}</p>
                  <p className="metric-change">
                    <i className="fas fa-arrow-up"></i>
                    {analytics.userGrowth.growth}% this month
                  </p>
                </div>
                <div className="metric-card">
                  <h3>Active Shops</h3>
                  <p className="metric-value">{analytics.shopPerformance.activeShops}</p>
                  <p className="metric-change">
                    <i className="fas fa-arrow-up"></i>
                    {analytics.shopPerformance.growth}% this month
                  </p>
                </div>
                <div className="metric-card">
                  <h3>Total Orders</h3>
                  <p className="metric-value">{analytics.platformSales.totalOrders}</p>
                  <p className="metric-change">
                    <i className="fas fa-arrow-up"></i>
                    {analytics.platformSales.growth}% this month
                  </p>
                </div>
              </div>
            </div>

            <div className="dashboard-card category-performance">
              <h2>Category Performance</h2>
              <div className="category-stats">
                {analytics.categoryPerformance.map(category => (
                  <div key={category._id} className="category-stat">
                    <h3>{category._id}</h3>
                    <div className="stat-details">
                      <p>Products: {category.productCount}</p>
                      <p>Total Stock: {category.totalStock}</p>
                      <p>Revenue: ${category.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 