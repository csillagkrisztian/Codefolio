import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./AboutPage.css";
import logo from "../../images/codeFoliologo.png";

export default function AboutPage() {
  return (
    <div className="about-page">
      <Grid
        container
        justify="center"
        direction="column"
        alignContent="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1 style={{ marginTop: "3rem", textAlign: "center" }}>
            About{" "}
            <img
              style={{ width: "240px", height: "auto", marginBottom: "1.4rem" }}
              src={logo}
            ></img>
          </h1>
        </Grid>
        <Grid item container justify="center" direction="row" xs={9}>
          <Grid item container justify="center" xs={12}>
            <img
              className="profileimage"
              src={
                "https://avatars3.githubusercontent.com/u/64927398?s=460&u=f9dcdf25def7a48132cf45fde5bc5c4a35503d42&v=4"
              }
            />
            <img
              className="profileimage"
              src={
                "https://avatars2.githubusercontent.com/u/60063346?s=460&u=602a8b10ffc8ece407290ccd81859cc2f031e418&v=4"
              }
            />

            <img
              className="profileimage"
              src={
                "https://avatars0.githubusercontent.com/u/59936284?s=460&u=9a65d8b52dcc0cadc5112508beae6a5c9966e97c&v=4"
              }
            />
          </Grid>
          <Grid item xs={9}>
            <h4 style={{ textAlign: "center", marginTop: "2rem" }}>
              This is our .codeFolio team
            </h4>
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              We decided to create .codeFolio, because we believed that people
              learn quicker from eachother than from hours of tutorials. We
              wanted to connect brave new coders to draw inspiration from their
              more experienced peers by examining their projects closely and
              understanding the recoursces necessary to achieve their goals as a
              developer. We are very proud of .codeFolio, because for us this
              was our jab at putting our foot in the door of a coding career. If
              you want to know more about us, feel free to click on our faces to
              see our github profiles ;)
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
