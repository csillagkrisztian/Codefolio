import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/CarouselItem/CarouselItem";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";

export default function MyProfilePage() {
  const user = useSelector(selectUser);

  return !user || !user.projects ? (
    <Loading />
  ) : (
    <div className="root">
      <Grid container justify="center" spacing={3}>
        <Grid className="profile" item xs={6}>
          <br />
          <h1>
            {user.name}

            <EditIcon />
          </h1>
          <img className="profile-main-image" src={user.userImg}></img>
          <Typography>
            Github:
            <br />
            {user.githubLink}
            <EditIcon />
          </Typography>
          <Typography>
            LinkedIn:
            <br />
            {user.linkedinLink}
            <EditIcon />
          </Typography>
        </Grid>
        <Grid item>
          <Carousel className="carousel" autoPlay={false}>
            {user.projects.map(({ projectImg, projectDes }, id) => {
              return (
                <Item
                  key={id + 1}
                  projectImg={projectImg}
                  description={projectDes}
                />
              );
            })}
          </Carousel>
        </Grid>
      </Grid>
    </div>
  );
}
