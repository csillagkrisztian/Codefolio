import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectViewed } from "../../store/projects/selector";
import { Grid, Button, Paper } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { postNewComment } from "../../store/projects/action";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const projectViewed = useSelector(selectProjectViewed);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(postNewComment(props.id, comment));
    setComment("");
  };
  return (
    <div>
      <Form style={{ margin: "3rem" }}>
        <Form.Group>
          <Form.Label>your Comment:</Form.Label>
          <Form.Control
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            required
          ></Form.Control>
        </Form.Group>
      </Form>
      <Button onClick={clickHandler}>Submit</Button>
      <div key={projectViewed.project.id}>
        {projectViewed.project.comments.map((com) => {
          return (
            <div>
              <p>{com.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
