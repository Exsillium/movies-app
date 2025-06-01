import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ResultsCard from "../components/movies/ResultsCard";
import fetcher from "../swr/fetcher";

export default function SearchResultsPage() {
  const { query } = useParams();
  const searchTerm = decodeURIComponent(query || "");

  const { data, error, isLoading } = useSWR(
    searchTerm
      ? `/search/multi?query=${encodeURIComponent(
          searchTerm
        )}&include_adult=false&language=en-US&page=1`
      : null,
    fetcher.get
  );

  const filteredResults = data?.results?.filter(
    (item) =>
      item.media_type !== "person" &&
      item.poster_path &&
      (item.title || item.name)
  );

  return (
    <Container className="py-4">
      <h2 className="mb-4">Search Results for: "{searchTerm}"</h2>

      {error && <div>Error loading results: {error.message}</div>}

      {isLoading ? (
        <div>Loading results...</div>
      ) : filteredResults?.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredResults.map((movie) => (
            <Col key={`${movie.id}-${movie.media_type}`}>
              <ResultsCard movie={movie} />
            </Col>
          ))}
        </Row>
      ) : (
        <div>No results found</div>
      )}
    </Container>
  );
}
