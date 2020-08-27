import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import "./ProfilePage.css";
import Item from "../../components/CarouselItem/CarouselItem";
import { useSelector, useDispatch } from "react-redux";
import { selectUserViewing } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { getProfile } from "../../store/user/actions";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Carousel } from "react-bootstrap";
import ResourcePicture from "../../components/ResourcePicture";
import ProfileCarousel from "../../components/CarouselItem/ProfileCarousel";

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(parseInt(id)));
  }, [dispatch]);

  const user = useSelector(selectUserViewing);

  console.log(user);

  return !user ? (
    <Loading />
  ) : (
    <div className="root">
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid
          className="profile"
          item
          container
          justify="center"
          alignItems="center"
          direction="column"
          xs={6}
        >
          <br />
          <h1>{user.name}</h1>
          <img className="profile-main-image" src={user.userImg}></img>
          <Typography>
            <GitHubIcon />
            <a href={user.githubLink}>GitHub</a>
          </Typography>
          <Typography>
            <LinkedInIcon />
            <a href={user.linkedinLink}>LinkedIn</a>
          </Typography>
        </Grid>
        <ProfileCarousel user={user} />
      </Grid>
    </div>
  );
}
