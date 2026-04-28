function CountryCard({ country }) {
  // Safely grab the first capital, or fall back to "N/A"
  const capital = country.capital ? country.capital[0] : 'N/A';

  // Format population with locale-aware thousand separators
  const population = country.population.toLocaleString();

  // Show up to the first 2 languages, joined by a comma, or "N/A"
  const languages = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A';

  return (
    <div className="country-card">
      <img
        className="country-flag"
        src={country.flags.svg}
        alt={'Flag of ' + country.name.common}
      />
      <div className="country-info">
        <h3>{country.name.common}</h3>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Languages:</strong> {languages}</p>
      </div>
    </div>
  );
}

export default CountryCard;
