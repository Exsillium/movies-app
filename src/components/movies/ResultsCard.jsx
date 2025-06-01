import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Use react-router-dom

export default function ResultsCard({ movie }) {
  const imageBase = "https://image.tmdb.org/t/p/w500";

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    transition: "transform 0.2s ease-in-out",
  };

  const cardHoverStyle = {
    cursor: "pointer",
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={linkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Card className="h-100 shadow-sm" style={cardHoverStyle}>
        <Card.Img
          variant="top"
          src={
            movie.poster_path
              ? `${imageBase}${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title || movie.name}
          style={{ objectFit: "cover", height: "350px" }}
        />
        <Card.Body className="p-2">
          <Card.Title className="text-center fw-bold">
            {movie.title || movie.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}
