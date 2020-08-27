import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";


import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  searchPost,
  emptySearch,
} from "../../store/projects/action";
import { projects, searchResults } from "../../store/projects/selector";
import "./HomePage.css";

import { Paper, Drawer, Button, Icon, Chip } from "@material-ui/core";

import SearchBar from "material-ui-search-bar";

export default function HomePage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(projects);

  const searchedPosts = useSelector(searchResults);
  const [projectAray, set_projectArray] = useState(allPosts);

  const [searchText, set_searchText] = useState("");
  console.log(allPosts);


  useEffect(function () {
    dispatch(fetchPosts);
  }, []);

  function deleteText() {
    set_searchText("");
    dispatch(emptySearch);
  }

  function searchProjects(e) {
    set_searchText(e.toLowerCase());
    if (e === "") {
      dispatch(emptySearch);
    }
    const newData = allPosts.filter(function (a) {
      return a.tags.find((tag) => tag.tagName === e);
    });
    if (newData.length > 0) {
      console.log(newData);
      dispatch(searchPost(newData));
    }
  }


  function Projects(props) {
    return (
      <div>
        <Link to={`/project/${props.id}`}>
          <Paper className="project-post">
            <div
              style={{ backgroundImage: `url(${props.img})` }}
              className="post-img"
            ></div>
            <div>
              <h3>{props.title}</h3>

              <div style={{ backgroundColor: "#fff" }}>
                {props.likes && props.likes.length}
                <FavoriteIcon color="secondary" fontSize="large" />
                {props.comments && props.comments.length}
                <CommentIcon color="secondary" fontSize="large" />
              </div>
            </div>
            <div>
              <p>{props.text}</p>
            </div>
          </Paper>
        </Link>
        {props.tags && props.tags.map((t, id) => {
          return <Chip key={id + 1} variant="outlined" label={t.tagName} />;
        })}
      </div>
    );
  }

  return (

    <div className="home-page">
      <div className="container">
        <h3 className="center">Search projects</h3>
        <SearchBar
          onCancelSearch={deleteText}
          value={searchText}
          onChange={searchProjects}
          className="search-bar"
        />

        {allPosts.length > 0 ? (
          <div>
            {!searchText
              ? allPosts.map((project, id) => (
                <Projects
                  key={id}
                  img={project.projectImg}
                  title={project.projectName}
                  text={project.projectDesc}
                  id={project.id}
                  tags={project.tags}
                  likes={project.likes}
                  comments={project.comments}
                />
              ))
              : searchedPosts.map((project, id) => (
                <Projects
                  key={id}
                  img={project.projectImg}
                  title={project.projectName}
                  text={project.projectDesc}
                />
              ))}
          </div>
        ) : (
            <h1>Loading</h1>
          )}
      </div>
    </div>
  );
}
