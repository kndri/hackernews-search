import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToSearchTerms } from "./actions";
import "./styles.css";

const App = ({ dispatch }) => {
  const [posts, setPosts] = useState([]);

  function onKeyUp(e) {
    if (e.keyCode === 13 || e.which === 13) {
      dispatch(addToSearchTerms(e.target.value));
      fetch(`https://hn.algolia.com/api/v1/search?query=${e.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data.hits);
        })
        .catch((error) => {
          this.setState({ ersror: error });
        });
    }
  }

  return (
    <div className="app">
      <h1>HackerNews Search</h1>
      <input
        className="search"
        type="text"
        name="q"
        placeholder="Search"
        onKeyUp={(e) => onKeyUp(e)}
      />
      <div className="posts__container">
        {posts &&
          posts.map((post) => (
            <div className="posts__post" key={post.objectID}>
              <a className="title" href={post.url}>
                {post.title}
              </a>
              <span>
                {post.points} by {post.author}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default connect()(App);
