import '../../assets/css/searchBarCss.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm tên sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;