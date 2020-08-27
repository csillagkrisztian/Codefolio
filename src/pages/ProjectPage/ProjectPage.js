import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Typography, Chip } from "@material-ui/core";
import "./ProjectPage.css";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/CarouselItem/CarouselItem";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../store/projects/action";
import { selectProjectViewed } from "../../store/projects/selector";

export default function ProfilePage() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(parsedId));
  }, [dispatch, id]);

  const projectViewed = useSelector(selectProjectViewed);

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
            <a href={projectViewed.user.githubLink}>
              <Typography>Github</Typography>
            </a>
            <a href={projectViewed.user.linkedinLink}>
              <Typography>LinkedIn</Typography>
            </a>
            <a href={projectViewed.project.feLink}>
              <Typography>Front-end repo</Typography>
            </a>
            <a href={projectViewed.project.beLink}>
              <Typography>Back-end repo</Typography>
            </a>
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
            <Typography>{projectViewed.project.projectDes}</Typography>

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
