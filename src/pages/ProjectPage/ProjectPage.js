import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import "./ProjectPage.css";
import Carousel from "react-material-ui-carousel";
import Item from "../../components/CarouselItem/CarouselItem";

export default function ProfilePage() {
  const user = {
    name: "rambo",
    ghLink: "github@rambo.com",
    liLink: "linkeding.com/rambo",
    profileImg:
      "https://qph.fs.quoracdn.net/main-qimg-1694bca506b96e0cb542a000a947bdc2.webp",
  };

  const projects = [
    {
      projectName: "I made an app that can count beans",
      feLink: "beancounter-frontend.com",
      beLink: "beancounter-backend.com",
      projectImg:
        "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/beans.jpg",
      ytUrl: "youtube.com/beancounter",
      projectDes:
        "My mother is very angry at me every time I get a bad grade in Math, and forces me to count beans, the jokes on her, if she wants to know if it's correct, she has to count herself",
      userId: 3,
    },
    {
      projectName: "An app that does your math homework",
      feLink: "mathsux-frontend.com",
      beLink: "mathsux-backend.com",
      projectImg: "https://i.ytimg.com/vi/Kp2bYWRQylk/maxresdefault.jpg",
      ytUrl: "youtube.com/mathsux",
      projectDes:
        "I only like math if it's in python, this app solves my problems, literally",
      userId: 1,
    },
    {
      projectName: "Hot single men in your area",
      feLink: "hotsinglemen-frontend.com",
      beLink: "hotsinglemen-backend.com",
      projectImg:
        "https://qph.fs.quoracdn.net/main-qimg-1694bca506b96e0cb542a000a947bdc2.webp",
      ytUrl: "youtube.com/hotsinglemen",
      projectDes:
        "I don't like to see only hot single ladies in my area, as a woman I want to see hot single men instead",
      userId: 2,
    },
  ];
  const { id } = useParams();
  const neededPost = projects.find((p) => p.userId === parseInt(id));
  return (
    <div className="root">
      <Grid container justify="center" spacing={3}>
        <Grid item container justify="center" xs={12}>
          <Grid item xs={3}>
            <br />
            <Typography>Posted by:</Typography>
            <img className="profileimage" src={user.profileImg}></img>
            <Typography>
              Github:
              <br />
              {user.ghLink}
            </Typography>
            <Typography>
              LinkedIn:
              <br />
              {user.liLink}
            </Typography>
            <Typography>
              Front-end repo:
              <br />
              {neededPost.feLink}
            </Typography>
            <Typography>
              Back-end repo:
              <br />
              {neededPost.beLink}
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
            <h1 className="title">{neededPost.projectName}</h1>
            <img className="projectimage" src={neededPost.projectImg}></img>
            <Typography>{neededPost.projectDes}</Typography>

            <Grid item>
              <Carousel className="carousel" autoPlay={false}>
                {projects.map(({ projectImg, projectDes }, id) => {
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
        </Grid>
      </Grid>
    </div>
  );
}
