import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const AddComment = ({ imdbID, setModded }) => {
  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "" });
  const [modalShow, setModalShow] = useState(false);
  const [commentObj, setCommentObj] = useState({
    comment: "",
    elementId: "",
    rate: 1,
  });

  const handleClose = () => {
    setModalShow(false);
  };

  const handleShow = () => {
    setModalShow(true);
  };

  const handleChange = (propertyName, propertyValue) => {
    setCommentObj({ ...commentObj, [propertyName]: propertyValue });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const url = "https://striveschool-api.herokuapp.com/api/comments/";

    const options = {
      method: "POST",
      body: JSON.stringify(commentObj),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTIyMGMwMzRmZjAwMTQwM2Y0Y2QiLCJpYXQiOjE2OTQwODk3MTgsImV4cCI6MTY5NTI5OTMxOH0.yy5_J1EHIdfBE0x6pZgPJ2RrplUDZE2vU6TvoY2MdDM",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setCommentObj({
          comment: "",
          elementId: imdbID,
          rate: 1,
        });
        // setTimeout(() => update(), 2000);
        setModded(true);
        const newComment = await response.json();
        setHasAlert(true);
        setAlert({
          message: "comment - " + newComment.comment + " - added!",
          variant: "success",
        });
        setTimeout(() => setHasAlert(false), 1800);
      } else {
        setHasAlert(true);
        setAlert({ message: "Error data", status: "satus: " + response.status, variant: "danger" });
        setTimeout(() => setHasAlert(false), 1800);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => handleClose(), 1900);
  };

  useEffect(() => {
    if (commentObj.elementId !== imdbID) {
      setCommentObj({ ...commentObj, elementId: imdbID });
    }
  }, [imdbID, commentObj]);

  return (
    <>
      <Button variant="border-secondary text-white btn-outline-secondary " className="w-100 mt-2" onClick={handleShow}>
        add comment
      </Button>

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>add comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hasAlert && (
            <Alert variant={alert.variant}>
              {alert.message}, {alert.status}
            </Alert>
          )}
          <Form id="addComment">
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Range
                min="1"
                max="5"
                step="1"
                value={commentObj.rate}
                onChange={event => handleChange("rate", event.target.value)}
              />
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="your comment..."
                value={commentObj.comment}
                onChange={event => handleChange("comment", event.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="addComment" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddComment;
