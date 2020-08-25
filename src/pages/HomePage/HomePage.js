import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/projects/action";
import { posts } from "../../store/projects/selector";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Drawer, Button, Icon } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./HomePage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
  },
  postImage: {
    height: "13rem",
    width: "100%",
    objectFit: "cover",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function HomePage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(posts);
  const [open, set_open] = useState(false);
  const [searchText, set_searchText] = useState("");
  const classes = useStyles();
  const toggleDrawer = () => set_open(!open);

  console.log(allPosts);

  useEffect(function () {
    dispatch(fetchPosts);
  }, []);

  console.log(searchText);

  return (
    <div className={classes.root}>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <h1>Here goes the chat!</h1>
        {/*list(anchor)*/}
      </Drawer>
      <ChatBubbleOutlineIcon onClick={toggleDrawer} className="chat-btn" />
      <Button onClick={toggleDrawer}>Open Chat</Button>

      <SearchBar
        value={searchText}
        onChange={(e) => set_searchText(e)}
        className="search-bar"
      />

      <Grid container justify="center" spacing={3}>
        <Grid item xs={10}></Grid>
        {!allPosts.length > 0 ? (
          <h1>Loading...</h1>
        ) : (
          allPosts.map((project, id) => {
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
                      {project.projectDesc}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
