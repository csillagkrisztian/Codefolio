import React from "react";
import { Typography } from "@material-ui/core";

export default function ResourcePicture(props) {
  const { image, title } = props;
  return <img className="profileimage" src={image} alt={title} />;
}
