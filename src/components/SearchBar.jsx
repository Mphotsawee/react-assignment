import { useRef } from 'react';

function SearchBar({ onSearch, searchTerm }) {
  const inputRef = useRef(null);

  function handleClear() {
    onSearch('');               // Clear the search term in the parent
    inputRef.current.focus();   // Return focus to the input
  }

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for a country..."
      />
      {searchTerm && (
        <button onClick={handleClear}>✕</button>
      )}
    </div>
  );
}

export default SearchBar;
