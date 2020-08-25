import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";

export default function ResourceForm(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((!name, !link, !imgUrl, !description)) {
      console.log("what the heck?");
    } else {
      console.log({ name, link, imgUrl, description });
      setName("");
      setLink("");
      setImgUrl("");
      setDescription("");
      //TODO dispatch to
    }
  };

  return (
    <Paper style={{ maxWidth: "16rem", margin: "2rem", padding: "1rem" }}>
      <Form>
        <Form.Group>
          <Form.Label>Resource Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            value={name}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Link</Form.Label>
          <Form.Control
            onChange={(e) => {
              setLink(e.target.value);
            }}
            required
            value={link}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            onChange={(e) => {
              setImgUrl(e.target.value);
            }}
            required
            value={imgUrl}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            required
            as="textarea"
            rows="5"
          ></Form.Control>
        </Form.Group>
        <Button onClick={handleSubmit} type="submit">
          Submit Resource
        </Button>
      </Form>
    </Paper>
  );
}
