import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import { Spinner } from "react-bootstrap";
import AddComment from "./AddComment";

const CommentArea = ({ imdbID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [comments, setComments] = useState([]);
  const [modded, setModded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const url = "https://striveschool-api.herokuapp.com/api/movies/" + imdbID + "/comments/";
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTIyMGMwMzRmZjAwMTQwM2Y0Y2QiLCJpYXQiOjE2OTQwODk3MTgsImV4cCI6MTY5NTI5OTMxOH0.yy5_J1EHIdfBE0x6pZgPJ2RrplUDZE2vU6TvoY2MdDM",
        },
      };

      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          // const data = await response.json().then(resp => resp.filter(elm => elm.elementId === props.imdbId));
          const data = await response.json();
          setComments(data);
        } else {
          setHasError(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (modded) {
      fetchComments();
      setModded(false);
    }
  }, [modded, imdbID]);

  useEffect(() => {
    setModded(true);
  }, [imdbID]);

  return (
    <>
      <div>
        {comments.length === 0 && <h5>There are no comments yet...</h5>}
        {hasError && <p>error!</p>}
        {isLoading ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <CommentList comments={comments} setModded={setModded} imdbID={imdbID} />
        )}
        <AddComment imdbID={imdbID} setModded={setModded} />
      </div>
      <div className="flex-grow-1"></div>
    </>
  );
};

export default CommentArea;
