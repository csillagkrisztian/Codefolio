import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
            <img
              className="profileimage"
              src={projectViewed.user.userImg}
            ></img>
            <Typography>
              Github:
              <br />
              {projectViewed.user.githubLink}
            </Typography>
            <Typography>
              LinkedIn:
              <br />
              {projectViewed.user.linkedinLink}
            </Typography>
            <Typography>
              Front-end repo:
              <br />
              {projectViewed.project.feLink}
            </Typography>
            <Typography>
              Back-end repo:
              <br />
              {projectViewed.project.beLink}
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
