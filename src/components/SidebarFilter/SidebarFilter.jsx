import "../../assets/css/sidebarFilterCss.css";

const SidebarFilter = ({ categories, brands, filters, onChange, clearFilters }) => {
  const priceRanges = [
    { label: "Dưới 2 triệu", min: 0, max: 2000000 },
    { label: "2 - 5 triệu", min: 2000000, max: 5000000 },
    { label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Bộ lọc</h3>
        <button className="clear-btn" onClick={clearFilters}>
          Bỏ lọc
        </button>
      </div>

      {/* Danh mục */}
      <div className="filter-group">
        <h4>Danh mục</h4>
        {categories.map(cat => (
          <div className="filter-item" key={cat}>
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => onChange("category", cat)}
            />
            <label>{cat}</label>
          </div>
        ))}
      </div>

      {/* Thương hiệu */}
      <div className="filter-group">
        <h4>Thương hiệu</h4>
        {brands.map(brand => (
          <div className="filter-item" key={brand}>
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => onChange("brand", brand)}
            />
            <label>{brand}</label>
          </div>
        ))}
      </div>

      {/* Giá */}
      <div className="filter-group">
        <h4>Mức giá</h4>
        {priceRanges.map(range => (
          <div className="filter-item" key={range.label}>
            <input
              type="radio"
              name="price"
              checked={filters.priceRange?.label === range.label}
              onChange={() => onChange("priceRange", range)}
            />
            <label>{range.label}</label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilter;