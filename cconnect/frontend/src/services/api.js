// Mock data for testing
const mockAnalytics = {
  salesData: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [1200, 1900, 1500, 2100, 1800, 2400, 2000]
  },
  productPerformance: [
    { _id: '1', name: 'Product 1', sales: 5000, unitsSold: 100, stock: 50 },
    { _id: '2', name: 'Product 2', sales: 3500, unitsSold: 70, stock: 30 },
    { _id: '3', name: 'Product 3', sales: 2800, unitsSold: 56, stock: 25 }
  ],
  customerAnalytics: {
    newCustomers: 150,
    returningCustomers: 300,
    loyalCustomers: 200,
    totalCustomers: 650,
    averageOrderValue: 85,
    retentionRate: 75
  },
  timeAnalytics: {
    hourlyData: [
      { hour: '00:00', orders: 5 },
      { hour: '02:00', orders: 2 },
      { hour: '04:00', orders: 1 },
      { hour: '06:00', orders: 3 },
      { hour: '08:00', orders: 15 },
      { hour: '10:00', orders: 25 },
      { hour: '12:00', orders: 35 },
      { hour: '14:00', orders: 30 },
      { hour: '16:00', orders: 28 },
      { hour: '18:00', orders: 22 },
      { hour: '20:00', orders: 18 },
      { hour: '22:00', orders: 10 }
    ],
    peakHours: ['12:00', '14:00'],
    averageOrderTime: 15,
    busiestDay: 'Wednesday'
  },
  userGrowth: {
    total: 1500,
    growth: 12
  },
  shopPerformance: {
    activeShops: 120,
    growth: 8
  },
  platformSales: {
    totalOrders: 5000,
    growth: 15
  },
  categoryPerformance: [
    { _id: 'Electronics', productCount: 150, totalStock: 3000, revenue: 50000 },
    { _id: 'Clothing', productCount: 200, totalStock: 5000, revenue: 45000 },
    { _id: 'Books', productCount: 100, totalStock: 2000, revenue: 25000 }
  ]
};

// Mock API functions
export const getShopAnalytics = async (shopId, timeRange) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAnalytics;
};

export const getAdminAnalytics = async (timeRange) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAnalytics;
}; 