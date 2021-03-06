import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Grid, Typography, Chip, Button, Paper } from "@material-ui/core";

import Comment from "../../components/Comment/Comment.js";
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
import CarouselComponent from "../../components/CarouselItem/CarouselItem";
import YouTubeIcon from "@material-ui/icons/YouTube";

export default function ProfilePage() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(false);

  const heartClick = () => {
    dispatch(likeClick(parsedId));
    dispatch(getProject(parsedId));
  };

  const commentClick = () => {
    setComments(comments ? "" : <Comment id={parsedId} />);
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
        <Grid className="project-grid" container justify="center" spacing={4}>
          <Grid item container justify="center" xs={12}>
            <Grid item xs={3}>
              <br />
              <Typography>Posted by:</Typography>
              <h2>{projectViewed.user.name}</h2>
              <Link to={`/profile/${projectViewed.user.id}`}>
                <img
                  className="profileimage"
                  src={projectViewed.user.userImg}
                ></img>
              </Link>

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
              <Typography>
                <YouTubeIcon />
                <a href={projectViewed.project.ytUrl}>Youtube Link</a>
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
            ><Paper className="post-article">
                <Grid item xs>
                  <h1 className="title">{projectViewed.project.projectName}</h1>
                </Grid>
                <Grid item xs>
                  {projectViewed.project.tags.map((t, id) => {
                    return (
                      <Chip className="tags-grid" key={id + 1} variant="outlined" label={t.tagName} />
                    );
                  })}
                </Grid>
                <img
                  className="projectimage"
                  src={projectViewed.project.projectImg}
                ></img>
                <Typography className="project-desc">{projectViewed.project.projectDesc}</Typography>
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
                  {!user.token ? (
                    <Button
                      onClick={() => {
                        alert("You are not logged in!");
                      }}
                    >
                      <CommentIcon color="secondary" fontSize="large" />
                    </Button>
                  ) : (
                      <Button onClick={commentClick}>
                        <CommentIcon color="secondary" fontSize="large" />
                      </Button>
                    )}
                </div>

                {comments}

                <CarouselComponent
                  array={projectViewed.project.resources}
                  name="title"
                  description="resourceDes"
                  linkName="link"
                  image="resourceImg"
                />
              </Paper>

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}
