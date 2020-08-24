import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { id } = useParams();
  return <div>ProjectPage {id}</div>;
}
