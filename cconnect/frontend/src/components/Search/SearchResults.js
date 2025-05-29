import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts, searchShops } from '../../services/api';
import ProductCard from '../Products/ProductCard';
import ShopCard from '../Shops/ShopCard';
import FilterSidebar from './FilterSidebar';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    city: '',
    isOpen: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        if (activeTab === 'all' || activeTab === 'products') {
          const productResults = await searchProducts(query, filters);
          setProducts(productResults.products);
        }

        if (activeTab === 'all' || activeTab === 'shops') {
          const shopResults = await searchShops(query, filters);
          setShops(shopResults.shops);
        }
      } catch (err) {
        setError('Error fetching search results');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, activeTab, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="search-results-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h1>Search Results for "{query}"</h1>
        <div className="search-tabs">
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => handleTabChange('all')}
          >
            All
          </button>
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => handleTabChange('products')}
          >
            Products ({products.length})
          </button>
          <button
            className={activeTab === 'shops' ? 'active' : ''}
            onClick={() => handleTabChange('shops')}
          >
            Shops ({shops.length})
          </button>
        </div>
      </div>

      <div className="search-results-content">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          activeTab={activeTab}
        />

        <div className="search-results-grid">
          {activeTab === 'all' || activeTab === 'products' ? (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="no-results">No products found</p>
              )}
            </div>
          ) : null}

          {activeTab === 'all' || activeTab === 'shops' ? (
            <div className="shops-grid">
              {shops.length > 0 ? (
                shops.map(shop => (
                  <ShopCard key={shop._id} shop={shop} />
                ))
              ) : (
                <p className="no-results">No shops found</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 