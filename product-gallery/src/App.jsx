import './App.css';
import products from './data/products';
import ProductCard from './components/ProductCard';

export default function App() {
  const availableCount = products.filter(product => product.inStock).length;

  return (
    <>
      <header className="app-header">
        <h1>Tech Shop</h1>
        <p>{products.length} products | {availableCount} available</p>
      </header>

      <div className="gallery-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
