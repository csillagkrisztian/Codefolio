import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, searchPost, emptySearch } from '../../store/posts/action';
import { posts, searchResults } from '../../store/posts/selector';
import './HomePage.css';

import { Paper, Drawer, Button, Icon } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';







export default function HomePage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(posts);
  const searchedPosts = useSelector(searchResults);
  const [open, set_open] = useState(false);
  const [projectAray, set_projectArray] = useState(allPosts);
  const [searchText, set_searchText] = useState('');
  const toggleDrawer = () => set_open(!open);



  useEffect(
    function () {
      dispatch(fetchPosts);
    }, []
  )






  function searchProjects(e) {
    set_searchText(e);
    if (e === "") {
      dispatch(emptySearch);
    }
    const newData = allPosts.filter(function (a) {
      return a.tags.find(tag => tag.tagName === e);
    });
    if (newData.length > 0) {
      console.log(newData);
      dispatch(searchPost(newData));
    }

  }
  console.log(searchedPosts);


  function Projects(props) {
    return <Paper className="project-post" >
      <div style={{ backgroundImage: `url(${props.img})` }} className="post-img">
      </div>
      <div>
        <h3>{props.title}</h3>
      </div>
      <div>
        <p>{props.text}</p>
      </div>
    </Paper>
  }

  return (
    <div >

      <Drawer anchor='right' open={open} onClose={toggleDrawer}>
        <h1>Here goes the chat!</h1>
        {/*list(anchor)*/}
      </Drawer>
      <div className="container">
        <ChatBubbleOutlineIcon onClick={toggleDrawer} className="chat-btn" />
        <Button onClick={toggleDrawer}>Open Chat</Button>

        <SearchBar value={searchText} onChange={searchProjects} className="search-bar" />

        {allPosts.length > 0 ? <div>
          {!searchText ? allPosts.map((project, id) => <Projects key={id} img={project.projectImg} title={project.projectName} text={project.projectDesc} />) : searchedPosts.map((project, id) => <Projects key={id} img={project.projectImg} title={project.projectName} text={project.projectDesc} />
          )}
        </div>
          : <h1>Loading</h1>}
      </div>
    </div>
  );
}
