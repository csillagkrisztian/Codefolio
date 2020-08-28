import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectViewed } from "../../store/projects/selector";
import { Grid, Button, Paper } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { postNewComment, getProject } from "../../store/projects/action";
import ReactEmoji from "react-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const projectViewed = useSelector(selectProjectViewed);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(postNewComment(props.id, comment));
    dispatch(getProject(props.id));
    setComment("");
  };
  return (
    <div key={projectViewed.project.id}>
      <ScrollToBottom>
        <div style={{ maxHeight: "900px" }}>
          {projectViewed.project.comments.map((com) => {
            return (
              <div
                style={{
                  border: "solid rgba(0, 0, 255, .1) 2px",
                  borderRadius: "20px",
                  padding: "2px",

                  margin: "2px",
                }}
              >
                <img
                  style={{
                    padding: "2px",
                    marginBottom: "0px",
                    display: "block",
                    width: "36px",
                    height: "36px",
                    overflow: "hidden",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={com.user.userImg}
                ></img>
                <Link to={`/profile/${com.user.id}`}>
                  <span style={{ color: "blue", fontStyle: "bold" }}>
                    {com.user.name}
                  </span>
                </Link>
                :<span> {ReactEmoji.emojify(com.comment)}</span>
                <p style={{ opacity: "0.5", fontSize: "12px" }}>
                  {moment(com.createdAt).format("LLLL")}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>
      <Form
        style={{
          margin: "3rem",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
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
        <Button style={{ marginTop: "1rem" }} onClick={clickHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
