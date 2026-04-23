import RatingStars from './RatingStars';

export default function ProductCard({ name, price, rating, reviews, inStock, category, image }) {
  const handleAddToCart = () => {
    if (inStock) {
      alert(`Added "${name}" to cart! Price: $${price.toFixed(2)}`);
    }
  };

  return (
    <div className={`product-card ${!inStock ? 'unavailable' : ''}`}>
      <div className="badge" style={inStock ? { backgroundColor: '#d4edda', color: '#155724' } : { backgroundColor: '#f8d7da', color: '#721c24' }}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </div>
      
      <img src={image} alt={name} className="product-image" />
      
      <div className="product-category">{category}</div>
      <h3 className="product-name">{name}</h3>
      
      <RatingStars rating={rating} reviews={reviews} />
      
      <div className="product-footer">
        <span className="product-price">${price.toFixed(2)}</span>
        <button 
          className="add-btn" 
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
