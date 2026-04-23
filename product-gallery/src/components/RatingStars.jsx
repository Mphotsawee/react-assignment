export default function RatingStars({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="rating-container">
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index}>★</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index}>½</span>;
          } else {
            return <span key={index} className="empty-star">☆</span>;
          }
        })}
      </div>
      <span className="reviews-count">({reviews} reviews)</span>
    </div>
  );
}
