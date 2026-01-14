import { useState, useMemo } from 'react';
import ProductCard from '../../components/Card/productCard';
import SidebarFilter from '../../components/SidebarFilter/SidebarFilter';
import SearchBar from '../../components/SearchBar/SearchBar';
import productData from '../../data/data.json';
import '../../assets/css/pageProductListCss.css';

const ProductList = () => {
  // State bộ lọc bên Sidebar
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: null 
  });

  // State cho ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueCategories = [...new Set(productData.map(item => item.category))];
  const uniqueBrands = [...new Set(productData.map(item => item.brand))];

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'category' || type === 'brand') {
        const list = prev[type];
        if (list.includes(value)) {
          return { ...prev, [type]: list.filter(item => item !== value) };
        } else {
          return { ...prev, [type]: [...list, value] };
        }
      }
      if (type === 'priceRange') {
        return { ...prev, priceRange: value };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({ category: [], brand: [], priceRange: null });
    setSearchTerm('');
    alert("Đã xóa bộ lọc")
  };

  const filteredProducts = useMemo(() => {
    return productData.filter(product => {
      // Logic Sidebar
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category);
      const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
      const priceMatch = !filters.priceRange || (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);
      
      // Logic Search: So sánh tên sản phẩm
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && brandMatch && priceMatch && searchMatch;
    });
  }, [filters, searchTerm]);

  return (
    <div className="page-container">
      {/* Cột Trái: Sidebar */}
      <div className="left-column">
        <SidebarFilter 
          categories={uniqueCategories}
          brands={uniqueBrands}
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
        />
      </div>

      {/* Cột Phải: Danh sách sản phẩm */}
      <div className="right-column">
        
        {/* Chèn SearchBar lên đầu */}
        <div style={{ marginBottom: '20px' }}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <h2 className="section-title">
          Sản phẩm nổi bật 
          <span style={{fontSize: '16px', fontWeight: 'normal', marginLeft: '10px'}}>
            ({filteredProducts.length} sản phẩm)
          </span>
        </h2>
        
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <div className="no-result">
              <p>
                {searchTerm 
                  ? `Không tìm thấy sản phẩm nào chứa "${searchTerm}"` 
                  : "Không tìm thấy sản phẩm phù hợp."}
              </p>
              <button onClick={clearFilters}>Xem tất cả sản phẩm</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;