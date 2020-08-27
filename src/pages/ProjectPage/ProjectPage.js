import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Grid, Typography, Chip, Button } from "@material-ui/core";

import "./ProjectPage.css";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/CarouselItem/CarouselItem";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../store/projects/action";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import { selectProjectViewed } from "../../store/projects/selector";
import { selectUser } from "../../store/user/selectors";
import { likeClick } from "../../store/user/actions";
import StorageIcon from "@material-ui/icons/Storage";
import WebIcon from "@material-ui/icons/Web";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function ProfilePage() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const dispatch = useDispatch();

  const heartClick = () => {
    dispatch(likeClick(parsedId));
    dispatch(getProject(parsedId));
  };

  useEffect(() => {
    dispatch(getProject(parsedId));
  }, []);

  const projectViewed = useSelector(selectProjectViewed);
  const user = useSelector(selectUser);

  const likeCheck =
    projectViewed &&
    projectViewed.project.likes.find((l) => l.userId === user.id);

  return !projectViewed ? (
    <Loading />
  ) : (
    <div className="root">
      <Grid container justify="center" spacing={4}>
        <Grid item container justify="center" xs={12}>
          <Grid item xs={3}>
            <br />
            <Typography>Posted by:</Typography>
            <h2>{projectViewed.user.name}</h2>
            <img
              className="profileimage"
              src={projectViewed.user.userImg}
            ></img>

            <Typography>
              <GitHubIcon />
              <a href={projectViewed.user.githubLink}>GitHub</a>
            </Typography>
            <Typography>
              <LinkedInIcon />
              <a href={projectViewed.user.linkedinLink}>LinkedIn</a>
            </Typography>

            <Typography>
              <WebIcon />
              <a href={projectViewed.project.feLink}>Front-end repo</a>
            </Typography>
            <Typography>
              <StorageIcon />
              <a href={projectViewed.project.beLink}>Back-end repo</a>
            </Typography>

          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing={5}
            xs={8}
          >
            <Grid item xs>
              <h1 className="title">{projectViewed.project.projectName}</h1>
            </Grid>
            <Grid item xs>
              {projectViewed.project.tags.map((t, id) => {
                return (
                  <Chip key={id + 1} variant="outlined" label={t.tagName} />
                );
              })}
            </Grid>
            <img
              className="projectimage"
              src={projectViewed.project.projectImg}
            ></img>
            <div style={{ backgroundColor: "#fff" }}>
              {projectViewed.project.likes.length}
              {likeCheck ? (
                <Button onClick={heartClick}>
                  <FavoriteIcon color="secondary" fontSize="large" />
                </Button>
              ) : (
                <Button onClick={heartClick}>
                  <FavoriteBorderIcon color="secondary" fontSize="large" />
                </Button>
              )}

              {projectViewed.project.comments.length}
              <Button>
                <CommentIcon color="secondary" fontSize="large" />
              </Button>
            </div>
            <Typography>{projectViewed.project.projectDesc}</Typography>

            <Grid item xs>
              <Carousel autoPlay={false}></Carousel>
              {projectViewed.project.resources.map(
                ({ projectImg, projectDes }, id) => {
                  return (
                    <Item
                      key={id + 1}
                      projectImg={projectImg}
                      description={projectDes}
                    />
                  );
                }
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
