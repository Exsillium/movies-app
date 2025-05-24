
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addWishList, removeWishList } from "../../store/slice/wishList";

export default function HeroSection({ details, imageBaseUrl }) {

   const bgImage = details.backdrop_path
    ? `${imageBaseUrl}${details.backdrop_path}`
    : "https://via.placeholder.com/1200x500?text=No+Backdrop";

  const dispatch = useDispatch();

  const wishItem = useSelector((state) => state.wishlist.wishItem);
  const isInWishlist = wishItem.some((item) => item.id === details.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeWishList({ id: details.id }));
    } else {
      dispatch(addWishList(details));
    }
  };

  function getYear(details) {
    if (
      details.first_air_date &&
      !isNaN(new Date(details.first_air_date).getFullYear())
    ) {
      return new Date(details.first_air_date).getFullYear();
    }
    if (
      details.release_date &&
      !isNaN(new Date(details.release_date).getFullYear())
    ) {
      return new Date(details.release_date).getFullYear();
    }
    return null;
  }

  const year = getYear(details);

  return (
    <div 
      className="hero-section position-relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px'
      }}
    >
      <div className="overlay position-absolute w-100 h-100" />
      <div className="container position-relative py-5">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img 
              src={`${imageBaseUrl}${details.poster_path}`}
              alt={details.name}
              className="img-fluid rounded-3 shadow-lg show-poster"
            />
          </div>
          <div className="col-md-8 text-white">
            <h1 className="display-4 fw-bold mb-3">{details.name}</h1>
            <div className="d-flex align-items-center mb-3 flex-wrap">
              <span className="rating-badge me-3">⭐ {details.vote_average.toFixed(1)}</span>
              <span className="text-light opacity-75 me-3">{details.vote_count.toLocaleString()} votes</span>
              <span className="bullet-separator me-3">•</span>
              <span className="me-3">{year}</span>
              <span className="bullet-separator me-3">•</span>
              <span className="status-badge">{details.status}</span>
              <button
                onClick={handleWishlistToggle}
                className="btn btn-link ms-3 p-0"
                style={{
                  verticalAlign: "middle",
                  textDecoration: "none",
                  boxShadow: "none",
                }}
              >
                {isInWishlist ? (
                  <FaHeart className="text-danger fs-3" />
                ) : (
                  <FaRegHeart className="text-secondary fs-3" />
                )}
              </button>
            </div>
            <p className="lead mb-4">{details.overview}</p>
            <div className="genres-list">
              {details.genres.map(genre => (
                <span key={genre.id} className="genre-badge">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}