import React, { Component } from "react";
import axios from "axios";

export default class ListPosts extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:2525/api/posts")
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="the-list">
        {this.state.notes.map(item => {
          return (
            <div className="list-item" key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.contents}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
