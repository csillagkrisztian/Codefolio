import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import "./CarouselItem.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CarouselComponent(props) {
  const { array, image, name, description, linkName } = props;
  if (!array) {
    return <p>What? No array?</p>;
  }
  return (
    <Grid item container justify="center" alignItems="center" xs={9}>
      <h3>Resources:</h3>
      <Carousel style={{ width: "100%", margin: "2rem" }}>
        {array.map((p, id) => {
          return (
            <Carousel.Item key={id}>
              <img
                style={{
                  height: "420px",
                  overflow: "hidden",
                  objectFit: "cover",
                  opacity: "0.1",
                }}
                className="d-block "
                src={"https://learn.g2.com/hubfs/edtech%20image.jpg"}
                alt={`Slide #${id + 1}`}
              />
              <Carousel.Caption>
                <a href={p[`${linkName}`]}>
                  <img className="profileimage" src={p[`${image}`]} />
                  <Paper>
                    <h3>{p[`${name}`]}</h3>
                    <p>{p[`${description}`]}</p>
                  </Paper>
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Grid>
  );
}
