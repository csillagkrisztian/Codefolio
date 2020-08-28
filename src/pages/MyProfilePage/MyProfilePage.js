import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  FormControl,
} from "@material-ui/core";
import { Carousel, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import ProfileCarousel from "../../components/CarouselItem/ProfileCarousel";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { updateProfile } from "../../store/user/actions";

export default function MyProfilePage() {
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const [editInfo, setEditInfo] = useState({
    name: "",
    userImg: "",
    githubLink: "",
    linkedinLink: "",
  });

  useEffect(() => {
    setEditInfo({
      name: user.name,
      userImg: user.userImg,
      githubLink: user.githubLink,
      linkedinLink: user.githubLink,
      motto: user.motto,
    });
  }, [edit, user]);

  const editClick = () => {
    setEdit(true);
  };

  const clickHandler = () => {
    const { name, userImg, githubLink, linkedinLink } = editInfo;
    if (!name || !userImg || !githubLink || !linkedinLink || !motto) {
      alert("Some info is missing from the form!");
    } else {
      dispatch(updateProfile(editInfo));
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "bugtracker1");
    formData.append("file", files);
    setLoading(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dsyta0pbg/image/upload", formData)
      .then((res) => setEditInfo({ ...editInfo, userImg: res.data.url }))
      .then(setLoading(false))
      .catch((err) => console.log(err));
    console.log("sucee finish");
  };

  const { name, userImg, githubLink, linkedinLink, motto } = editInfo;

  return !user ? (
    <Loading />
  ) : !user.name ? (
    <h3 style={{ textAlign: "center", marginTop: "40vh" }}>
      Please log in to post a new project <LockIcon />
    </h3>
  ) : !edit ? (
    <div className="root">
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid className="profile" item xs={6}>
          <br />
          <h1>
            {user.name}

            <EditIcon onClick={editClick} />
          </h1>
          <img
            onClick={editClick}
            className="profile-main-image"
            src={user.userImg}
          ></img>
          <Typography style={{ margin: "1rem" }}>{user.motto}</Typography>
          <Typography>
            Github:
            <br />
            {user.githubLink}
            <EditIcon onClick={editClick} />
          </Typography>
          <Typography>
            LinkedIn:
            <br />
            {user.linkedinLink}
            <EditIcon onClick={editClick} />
          </Typography>
        </Grid>
        {!user.projects ? (
          <p>Your project will be visible here!</p>
        ) : (
          <ProfileCarousel user={user} />
        )}
      </Grid>
    </div>
  ) : (
    <div className="root">
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid className="profile" item xs={6}>
          <br />
          <Form>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setEditInfo({ ...editInfo, name: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicImageUrl">
              <Form.Label>Image url</Form.Label>
              <Form.Control onChange={uploadImage} type="file" required />
            </Form.Group>
            {loading ? (
              <h5>loading...</h5>
            ) : (
              <img className="profile-main-image" src={userImg} />
            )}
            <Form.Group>
              <Form.Label>Motto</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={motto}
                onChange={(e) => {
                  setEditInfo({ ...editInfo, motto: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>GitHub Link</Form.Label>
              <Form.Control
                value={githubLink}
                onChange={(e) => {
                  setEditInfo({ ...editInfo, githubLink: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>LinkedIn Link</Form.Label>
              <Form.Control
                value={linkedinLink}
                onChange={(e) => {
                  setEditInfo({ ...editInfo, linkedinLink: e.target.value });
                }}
              />
            </Form.Group>

            <Button onClick={clickHandler}>Submit</Button>
          </Form>
        </Grid>
        {!user.projects ? (
          <p>Your project will be visible here!</p>
        ) : (
          <ProfileCarousel user={user} />
        )}
      </Grid>
    </div>
  );
}
