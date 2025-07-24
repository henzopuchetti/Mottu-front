import './SearchBar.css';

function SearchBar({ value, onChange, placeholder = 'Pesquisar...' }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;
