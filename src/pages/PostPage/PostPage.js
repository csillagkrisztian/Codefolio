import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
import ResourceForm from "../../components/ResourceForm";
import { useSelector } from "react-redux";
import { selectProjectToBeResources } from "../../store/projects/selector";

export default function PostPage() {
  const [name, setName] = useState("");
  const [feRepo, setFeRepo] = useState("");
  const [beRepo, setBeRepo] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [valid, setValid] = useState(false);

  const resources = useSelector(selectProjectToBeResources);

  useEffect(() => {
    if (resources.length > 1) {
      setValid(true);
    }
  }, [resources]);

  console.log(resources);
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
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Front-end Repo Link</Form.Label>
              <Form.Control type="url"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Back-end Repo Link</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image Url</Form.Label>
              <Form.Control type="url"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Youtube Url</Form.Label>
              <Form.Control type="url"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Description</Form.Label>
              <Form.Control as="textarea" rows="5"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control as="textarea" rows="2"></Form.Control>
            </Form.Group>
            {valid ? (
              <Button>Submit</Button>
            ) : (
              <p>Please add at least 2 resources</p>
            )}
          </Form>
        </Grid>
        <Grid item container justify="center">
          <Grid item xs>
            <ResourceForm />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
