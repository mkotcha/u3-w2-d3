import { useState } from "react";
import { Alert, Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommentArea from "./CommentArea";

const MovieDetails = props => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  useState(() => {
    const fetchShow = async imdbID => {
      const url = new URL("https://www.omdbapi.com/?apikey=468924f2&s&i=" + imdbID);

      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (response.ok) {
          const show = await response.json();

          if (show.Response === "True") {
            setShow(show);
          } else {
            setError(show.Error);
            setHasError(true);
          }
        } else {
          setError(response.status);
          setHasError(true);
        }
      } catch (err) {
        setError(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShow(params.imdbID);
  }, []);

  return (
    <>
      {hasError ? (
        <Container className="mb-5">
          <Alert variant="danger">error: {error}</Alert>
        </Container>
      ) : !isLoading ? (
        <>
          <Container>
            <div className="d-flex flex-wrap flex-md-nowrap mb-5">
              <div>
                <img src={show.Poster} alt={show.Title} />
              </div>
              <div className="p-4">
                <h3>{show.Title}</h3>
                <div className="fs-7">
                  <p>
                    {show.Type} - {show.Runtime} - {show.Language}
                  </p>
                  <p>
                    {show.Genre} - {show.Year}
                  </p>
                  <p>
                    ratings:{" "}
                    <Badge bg="warning" text="dark">
                      {show.imdbRating}
                    </Badge>
                  </p>
                  <p>director: {show.Director}</p>
                  <p>with: {show.Actors}</p>
                </div>
                <p>{show.Plot}</p>
              </div>
            </div>
          </Container>
          <Container className="mb-5">
            <Row>
              <Col md={8} lg={7} xl={6}>
                <CommentArea imdbID={params.imdbID}></CommentArea>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Container className="p-5">
          <Spinner animation="border" variant="danger" />
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
