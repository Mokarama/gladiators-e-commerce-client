import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import styles from './Explore.module.css';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const keywordParam = searchParams.get('keyword') || '';
        const categoryParam = searchParams.get('category') || '';
        const pageParam = searchParams.get('page') || 1;
        const sortParam = searchParams.get('sort') || '';
        
        let url = `import.meta.env.VITE_API_URL/api/products?keyword=${keywordParam}&pageNumber=${pageParam}`;
        if (categoryParam) url += `&category=${categoryParam}`;
        if (sortParam) url += `&sort=${sortParam}`;

        const { data } = await axios.get(url);
        
        // Map _id to id for the frontend Card component expectation
        const mappedProducts = data.products.map(p => ({ ...p, id: p._id }));
        
        setProducts(mappedProducts);
        setTotalPages(data.pages);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({ keyword: searchQuery, page: 1 });
  };

  const updateParams = (newParams) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, ...newParams });
  };

  return (
    <div className="container py-8">
      <div className={styles.header}>
        <h1 className="text-3xl font-bold mb-2">Explore Items</h1>
        <p className="text-secondary">Find the best products tailored for you.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarOpen : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <SlidersHorizontal size={20} /> Filters
            </h2>
            <button className={styles.closeFilterBtn} onClick={() => setIsFilterOpen(false)}>✕</button>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterLabel}>Category</h3>
            <div className="flex flex-col gap-2">
              {['All', 'Electronics', 'Fashion', 'Sports', 'Home & Living'].map(cat => (
                <label key={cat} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === (cat === 'All' ? '' : cat)}
                    onChange={() => {
                      const val = cat === 'All' ? '' : cat;
                      setSelectedCategory(val);
                      updateParams({ category: val, page: 1 });
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterLabel}>Sort By</h3>
            <select 
              className={styles.select}
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                updateParams({ sort: e.target.value, page: 1 });
              }}
            >
              <option value="">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Highest Rated</option>
            </select>
          </div>

          <Button fullWidth onClick={() => {
            setSelectedCategory('');
            setSortOption('');
            setSearchQuery('');
            setSearchParams({});
          }}>Clear All Filters</Button>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.searchBar}>
            <button 
              className={styles.mobileFilterBtn}
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={20} />
            </button>
            <form onSubmit={handleSearch} className="flex-grow flex gap-2">
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-0"
              />
              <Button type="submit"><Search size={20} /></Button>
            </form>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--primary-color)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite'}}></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-error">
              <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
              <p>{error}</p>
              <p className="text-sm mt-2 text-secondary">Check if your backend/MongoDB is running.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-secondary">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {products.map(product => (
                  <Card key={product.id} item={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button 
                    variant="secondary" 
                    disabled={page === 1}
                    onClick={() => { setPage(p => p - 1); updateParams({ page: page - 1 }); }}
                  >
                    Previous
                  </Button>
                  <span className="font-medium">Page {page} of {totalPages}</span>
                  <Button 
                    variant="secondary"
                    disabled={page === totalPages}
                    onClick={() => { setPage(p => p + 1); updateParams({ page: page + 1 }); }}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
