import React from "react";
import { Paper, Typography } from "@material-ui/core";
import "./CarouselItem.css";

export default function Item(props) {
  return (
    <Paper>
      <img className="itemimage" src={props.projectImg}></img>
      <Typography>{props.description}</Typography>
    </Paper>
  );
}
