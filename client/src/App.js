import React, { Component } from "react";
import ListPosts from "./components/ListPosts";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListPosts />
      </div>
    );
  }
}

export default App;
