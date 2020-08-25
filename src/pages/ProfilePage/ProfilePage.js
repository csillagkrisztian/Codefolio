import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import "./ProfilePage.css";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/CarouselItem/CarouselItem";
import { useSelector, useDispatch } from "react-redux";
import { selectUserViewing } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { getProfile } from "../../store/user/actions";

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUserViewing);

  useEffect(() => {
    dispatch(getProfile(parseInt(id)));
  }, []);
  console.log(user);

  return !user ? (
    <Loading />
  ) : (
    <div className="root">
      <Grid container justify="center" spacing={3}>
        <Grid className="profile" item xs={6}>
          <br />
          <h1>{user.name}</h1>
          <img className="profile-main-image" src={user.userImg}></img>
          <Typography>
            Github:
            <br />
            {user.githubLink}
          </Typography>
          <Typography>
            LinkedIn:
            <br />
            {user.linkedinLink}
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
