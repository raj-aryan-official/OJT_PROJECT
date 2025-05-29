import api from './api';
import cacheService from './cache';

class SearchService {
  constructor() {
    this.debounceTimeout = null;
    this.lastQuery = '';
  }

  // Search products with caching
  async searchProducts(params) {
    const cacheKey = cacheService.generateKey({
      type: 'products',
      ...params
    });

    // Check cache first
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from API
    const response = await api.get('/search/products', { params });
    cacheService.set(cacheKey, response.data);
    return response.data;
  }

  // Search shops with caching
  async searchShops(params) {
    const cacheKey = cacheService.generateKey({
      type: 'shops',
      ...params
    });

    // Check cache first
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from API
    const response = await api.get('/search/shops', { params });
    cacheService.set(cacheKey, response.data);
    return response.data;
  }

  // Get search suggestions with debouncing
  async getSuggestions(query, type = 'all') {
    // Clear previous timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // If query is too short, return empty array
    if (query.length < 2) {
      return [];
    }

    // If query is the same as last query, return cached results
    if (query === this.lastQuery) {
      const cacheKey = cacheService.generateKey({
        type: 'suggestions',
        query,
        suggestionType: type
      });
      return cacheService.get(cacheKey) || [];
    }

    // Debounce API call
    return new Promise((resolve) => {
      this.debounceTimeout = setTimeout(async () => {
        try {
          const response = await api.get('/search/suggestions', {
            params: { query, type }
          });

          // Cache suggestions
          const cacheKey = cacheService.generateKey({
            type: 'suggestions',
            query,
            suggestionType: type
          });
          cacheService.set(cacheKey, response.data);

          this.lastQuery = query;
          resolve(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          resolve([]);
        }
      }, 300); // 300ms debounce
    });
  }

  // Clear search cache
  clearCache() {
    const stats = cacheService.getStats();
    stats.keys.forEach(key => {
      if (key.includes('type') && key.includes('products') || key.includes('shops')) {
        cacheService.clear(key);
      }
    });
  }

  // Clear suggestions cache
  clearSuggestionsCache() {
    const stats = cacheService.getStats();
    stats.keys.forEach(key => {
      if (key.includes('type') && key.includes('suggestions')) {
        cacheService.clear(key);
      }
    });
  }
}

export const searchService = new SearchService();
export default searchService; 