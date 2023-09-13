import { useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommentArea from "./CommentArea";

const MovieDetails = props => {
  const params = useParams();
  const [imdbID, setImdbID] = useState(params.imdbID);
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

          if (show.Response) {
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

    fetchShow(imdbID);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Container>
            <div className="d-flex">
              <img src={show.Poster} alt={show.Title} />
              <div className="p-4">
                <h3>{show.Title}</h3>
                <div className="fs-7">
                  <p>
                    {show.Type} - {show.Runtime}
                  </p>
                  <p>
                    {show.Genre} - {show.Year}
                  </p>
                  <p>
                    ratings: <Badge>{show.imdbRating}</Badge>
                  </p>
                  <p>director: {show.Director}</p>
                  <p>with: {show.Actors}</p>
                </div>
                <p>{show.Plot}</p>
              </div>
            </div>
          </Container>
          <Container>
            <CommentArea imdbID={imdbID}></CommentArea>
          </Container>
        </>
      )}
    </>
  );
};

export default MovieDetails;
