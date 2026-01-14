import { useState, useMemo } from "react";
import ProductCard from "../../components/Card/productCard";
import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";
import SearchBar from '../../components/SearchBar/SearchBar';
import productData from "../../data/data.json";
import "../../assets/css/pageProductListCss.css";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: null,
  });

  const categories = [...new Set(productData.map(p => p.category))];
  const brands = [...new Set(productData.map(p => p.brand))];

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === "category" || type === "brand") {
        const list = prev[type];
        return {
          ...prev,
          [type]: list.includes(value)
            ? list.filter(i => i !== value)
            : [...list, value],
        };
      }

      if (type === "priceRange") {
        return { ...prev, priceRange: value };
      }

      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({ category: [], brand: [], priceRange: null });
    setSearchTerm("");
    alert("Đã xóa bộ lọc");
  };

  const filteredProducts = useMemo(() => {
    return productData.filter(p => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(p.category);

      const brandMatch =
        filters.brand.length === 0 ||
        filters.brand.includes(p.brand);

      const priceMatch =
        !filters.priceRange ||
        (p.price >= filters.priceRange.min &&
          p.price <= filters.priceRange.max);

      const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && brandMatch && priceMatch && searchMatch;
    });
  }, [filters, searchTerm]);

  return (
    <div className="page-container">
      {/* SIDEBAR */}
      <aside className="left-column">
        <SidebarFilter
          categories={categories}
          brands={brands}
          filters={filters}
          onChange={handleFilterChange}
          clearFilters={clearFilters}
        />
      </aside>

      {/* PRODUCT LIST */}
      <main className="right-column">
        <div style={{ marginBottom: '20px' }}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <h2 className="section-title">
          Sản phẩm ({filteredProducts.length})
        </h2>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-result">
              <p>
                {
                  searchTerm 
                    ? `Không tìm thấy sản phẩm có tên "${searchTerm}"` 
                    : "Không tìm thấy sản phẩm phù hợp"
                }
              </p>
              <button onClick={clearFilters}>Bỏ bộ lọc</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductList;