import React, { useState, useEffect } from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import { Form } from "react-bootstrap";
import Carousel from "react-material-ui-carousel";
import ResourceForm from "../../components/ResourceForm";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectToBeResources } from "../../store/projects/selector";
import { postNewProject, deleteProjectToBe } from "../../store/projects/action";
import Item from "../../components/CarouselItem/CarouselItem";
import ResourcePicture from "../../components/ResourcePicture";
import axios from "axios";

export default function PostPage() {
  const [name, setName] = useState("");
  const [feRepo, setFeRepo] = useState("");
  const [beRepo, setBeRepo] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://as1.ftcdn.net/jpg/02/70/22/86/500_F_270228625_yujevz1E4E45qE1mJe3DyyLPZDmLv4Uj.jpg"
  );
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const resources = useSelector(selectProjectToBeResources);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      name &&
      feRepo &&
      beRepo &&
      youtubeUrl &&
      imageUrl &&
      description &&
      tags &&
      resources.length > 1
    ) {
      setValid(true);
    }
  }, [
    resources,
    name,
    feRepo,
    beRepo,
    tags,
    description,
    imageUrl,
    youtubeUrl,
  ]);

  const tagsArray = tags.split(/[\s,]+/);
  const tagsArrayObjects = tagsArray.map((tag) => {
    return { tagName: tag.toLowerCase() };
  });
  console.log(tagsArrayObjects);
  //=========================================>uploading Image API
  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "bugtracker1");
    formData.append("file", files);
    setLoading(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dsyta0pbg/image/upload", formData)
      .then((res) => setImageUrl(res.data.url))
      .then(setLoading(false))
      .catch((err) => console.log(err));
    console.log("sucee finish");
  };

  //============================================>End

  const clickHandler = () => {
    dispatch(
      postNewProject({
        projectName: name,
        feLink: feRepo,
        beLink: beRepo,
        projectImg: imageUrl,
        ytUrl: youtubeUrl,
        projectDesc: description,
        resources,
        tags: tagsArrayObjects,
      })
    );
    dispatch(deleteProjectToBe);
    setName("");
    setFeRepo("");
    setBeRepo("");
    setDescription("");
    setImageUrl("");
    setTags("");
    setValid(false);
    setYoutubeUrl("");
  };

  return (
    <div>
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={8}>
          <Form style={{ margin: "3rem" }}>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Front-end Repo Link</Form.Label>
              <Form.Control
                value={feRepo}
                onChange={(e) => {
                  setFeRepo(e.target.value);
                }}
                type="url"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Back-end Repo Link</Form.Label>
              <Form.Control
                value={beRepo}
                onChange={(e) => {
                  setBeRepo(e.target.value);
                }}
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
              <img src={imageUrl} style={{ width: "45px", height: "45px" }} />
            )}
            <Form.Group>
              <Form.Label>Youtube Url</Form.Label>
              <Form.Control
                value={youtubeUrl}
                onChange={(e) => {
                  setYoutubeUrl(e.target.value);
                }}
                type="url"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                as="textarea"
                rows="5"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                as="textarea"
                rows="2"
              ></Form.Control>
            </Form.Group>
            {valid ? (
              <Button onClick={() => clickHandler()}>Submit</Button>
            ) : (
              <p>Please add at least 2 resources</p>
            )}
          </Form>
        </Grid>
        <Grid item container justify="center">
          <Grid item xs={4}>
            <ResourceForm />
          </Grid>
          <Grid item xs={8}>
            <Paper style={{ margin: "3rem" }}>
              {resources.map(({ resourceImg, title }, id) => {
                return (
                  <ResourcePicture
                    key={id + 1}
                    image={resourceImg}
                    title={title}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
