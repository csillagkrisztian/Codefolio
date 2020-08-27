import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addResource } from "../store/projects/action";
import axios from "axios";

export default function ResourceForm(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://as1.ftcdn.net/jpg/02/70/22/86/500_F_270228625_yujevz1E4E45qE1mJe3DyyLPZDmLv4Uj.jpg"
  );
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //=========================================>uploading Image API
  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "bugtracker1");
    formData.append("file", files);
    setLoading(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dsyta0pbg/image/upload", formData)
      .then((res) => setImgUrl(res.data.url))
      .then(setLoading(false))
      .catch((err) => console.log(err));
    console.log("sucee finish");
  };

  //============================================>End

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((!name, !link, !imgUrl, !description)) {
      console.log("what the heck?");
    } else {
      dispatch(
        addResource({
          title: name,
          link,
          resourceImg: imgUrl,
          resourceDes: description,
        })
      );
      setName("");
      setLink("");
      setImgUrl("");
      setDescription("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "16rem",
        marginLeft: "4rem",
        marginBottom: "12rem",
        padding: "1rem",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Resources</h1>
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
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image url</Form.Label>
          <Form.Control onChange={uploadImage} type="file" required />
        </Form.Group>
        {loading ? (
          <h5>loading...</h5>
        ) : (
          <img src={imgUrl} style={{ width: "45px", height: "45px" }} />
        )}
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
    </div>
  );
}
