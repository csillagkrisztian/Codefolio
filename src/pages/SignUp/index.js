import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import axios from "axios";
import "./SignUp.css";
import { Paper } from "@material-ui/core";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [image, setImage] = useState("");
  const [motto, setMotto] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "bugtracker1");
    formData.append("file", files);
    setLoading(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dsyta0pbg/image/upload", formData)
      .then((res) => setImage(res.data.url))
      .then(setLoading(false))
      .catch((err) => console.log(err));
    console.log("sucee finish");
  };

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password, github, linkedin, image, motto));
    console.log(name, email, password, github, linkedin, image, motto);

    setEmail("");
    setPassword("");
    setName("");
    setGithub("");
    setLinkedin("");
    setImage("");
    setMotto("");
  }

  return (
    <div className="signup-page">
      <Container>
        <Paper>
          <Form
            style={{ marginBottom: "8rem", padding: "1rem" }}
            as={Col}
            md={{ span: 6, offset: 3 }}
            className="mt-5"
          >
            <h1 className="mt-5 mb-5">Signup</h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicGithub">
              <Form.Label>Github</Form.Label>
              <Form.Control
                value={github}
                onChange={(event) => setGithub(event.target.value)}
                type="text"
                placeholder="Github"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicLinkedin">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
                type="text"
                placeholder="Linkedin"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicMotto">
              <Form.Label>Motto</Form.Label>
              <Form.Control
                value={motto}
                onChange={(event) => setMotto(event.target.value)}
                as="textarea"
                rows="2"
                placeholder="Describe yourself in a few words"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicImageUrl">
              <Form.Label>Image url</Form.Label>
              <Form.Control onChange={uploadImage} type="file" required />
            </Form.Group>
            {loading ? (
              <h5>loading...</h5>
            ) : (
              <img src={image} style={{ width: "45px", height: "45px" }} />
            )}
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Sign up
              </Button>
            </Form.Group>
            <Link to="/login">Click here to log in</Link>
          </Form>
        </Paper>
      </Container>
    </div>
  );
}
