import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ResultsCard from "../components/movies/ResultsCard";
import { tmdbApi } from "../apis/config";

export default function SearchResultsPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const searchTerm = decodeURIComponent(query);
        const res = await tmdbApi.get("/search/multi", {
          params: {
            query: searchTerm,
            include_adult: false,
            language: "en-US",
            page: 1,
          },
        });

        const filtered = res.data.results.filter(
          (item) => item.poster_path && (item.title || item.name)
        );
        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        Search Results for: "{decodeURIComponent(query)}"
      </h2>

      {isLoading ? (
        <div>Loading results...</div>
      ) : results.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {results.map((movie) => (
            <Col key={movie.id}>
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
