import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

const API =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function App() {
  const { data: countries, loading, error } = useFetch(API);

  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Show a simple loading state while the request is in flight
  if (loading) return <p>Loading countries...</p>;

  // Surface any network / HTTP errors to the user
  if (error) return <p>Error: {error}</p>;

  // Filter by search term (case-insensitive) AND selected region
  const filtered = (countries || []).filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  // Sort A → Z by country name
  const sorted = [...filtered].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────── */}
      <header className="app-header">
        <h1>Country Explorer</h1>
      </header>

      {/* ── Search bar ─────────────────────────────── */}
      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

      {/* ── Region filter buttons ───────────────────── */}
      <div className="region-buttons">
        {regions.map((region) => (
          <button
            key={region}
            className={selectedRegion === region ? 'active' : ''}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      {/* ── Result count ───────────────────────────── */}
      <p className="result-count">
        Showing {sorted.length} of {(countries || []).length} countries
      </p>

      {/* ── Country grid ───────────────────────────── */}
      <div className="country-grid">
        {sorted.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}

export default App;
