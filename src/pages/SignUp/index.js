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

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [image, setImage] = useState("");
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

    dispatch(signUp(name, email, password, github, linkedin, image));
    console.log(name, email, password, github, linkedin, image);

    setEmail("");
    setPassword("");
    setName("");
    setGithub("");
    setLinkedin("");
    setImage("");
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
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
    </Container>
  );
}
