import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProfileCarousel(props) {
  const { user } = props;
  return (
    <Grid
      item
      style={{ marginBottom: "12rem" }}
      container
      justify="center"
      alignItems="center"
      xs={9}
    >
      <Carousel>
        {user.projects &&
          user.projects.map((p, id) => {
            return (
              <Carousel.Item key={id}>
                <Link to={`/project/${p.id}`}>
                  <img
                    style={{
                      height: "420px",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    className="d-block w-100"
                    src={p.projectImg}
                    alt={`Slide #${id + 1}`}
                  />
                </Link>
                <Carousel.Caption>
                  <Paper>
                    <h3>{p.projectName}</h3>
                  </Paper>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </Grid>
  );
}
