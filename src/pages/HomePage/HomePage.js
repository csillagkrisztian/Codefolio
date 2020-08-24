import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
  },
  postImage: {
    height: "13rem",
    width: "26rem",
    objectFit: "cover",
  },
}));

export default function HomePage() {
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={10}>
          <h1 className={classes.title}>CodeFolio</h1>
        </Grid>
        {projects.map((project, id) => {
          return (
            <Grid item xs={10} key={id + 1}>
              <Paper>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={4}>
                    <img
                      className={classes.postImage}
                      src={project.projectImg}
                    ></img>
                  </Grid>
                  <Grid item xs={3}>
                    <h2 className={classes.title}>{project.projectName}</h2>
                  </Grid>
                  <Grid item xs={5}>
                    {project.projectDes}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
