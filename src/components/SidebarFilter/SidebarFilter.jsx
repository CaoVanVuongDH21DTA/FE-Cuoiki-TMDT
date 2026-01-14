import React from 'react';
import '../../assets/css/sidebarFilterCss.css'; 

const SidebarFilter = ({ 
    categories, 
    brands, 
    filters, 
    handleFilterChange,
    clearFilters 
}) => {
  
  // Định nghĩa các khoảng giá
  const priceRanges = [
    { label: "Dưới 2 triệu", min: 0, max: 2000000 },
    { label: "2 triệu - 5 triệu", min: 2000000, max: 5000000 },
    { label: "5 triệu - 10 triệu", min: 5000000, max: 10000000 },
    { label: "Trên 10 triệu", min: 10000000, max: Infinity },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Bộ Lọc</h3>
        <button onClick={clearFilters} className="clear-btn">Bỏ lọc</button>
      </div>

      {/* 1. Lọc theo Danh mục */}
      <div className="filter-group">
        <h4>Danh mục</h4>
        {categories.map((cat, index) => (
          <div key={index} className="filter-item">
            <input
              type="checkbox"
              id={`cat-${index}`}
              checked={filters.category.includes(cat)}
              onChange={() => handleFilterChange('category', cat)}
            />
            <label htmlFor={`cat-${index}`}>{cat}</label>
          </div>
        ))}
      </div>

      {/* 2. Lọc theo Thương hiệu */}
      <div className="filter-group">
        <h4>Thương hiệu</h4>
        {brands.map((brand, index) => (
          <div key={index} className="filter-item">
            <input
              type="checkbox"
              id={`brand-${index}`}
              checked={filters.brand.includes(brand)}
              onChange={() => handleFilterChange('brand', brand)}
            />
            <label htmlFor={`brand-${index}`}>{brand}</label>
          </div>
        ))}
      </div>

      {/* 3. Lọc theo Giá (Radio button để chọn 1 khoảng giá) */}
      <div className="filter-group">
        <h4>Mức giá</h4>
        {priceRanges.map((range, index) => (
          <div key={index} className="filter-item">
            <input
              type="radio"
              name="priceRange"
              id={`price-${index}`}
              checked={filters.priceRange?.label === range.label}
              onChange={() => handleFilterChange('priceRange', range)}
            />
            <label htmlFor={`price-${index}`}>{range.label}</label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilter;