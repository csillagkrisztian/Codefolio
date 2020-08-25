import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
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

  console.log(projectViewed);
  const projects = [1, 2, 3, 4];

  return !projectViewed ? (
    <Loading />
  ) : (
    <div className="root">
      <Grid container justify="center" spacing={3}>
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
            alignContent="center"
            spacing={5}
            xs={8}
          >
            <h1 className="title">{projectViewed.project.projectName}</h1>
            <img
              className="projectimage"
              src={projectViewed.project.projectImg}
            ></img>
            <Typography>{projectViewed.project.projectDes}</Typography>

            <Grid item>
              <Carousel className="carousel" autoPlay={false}>
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
              </Carousel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
