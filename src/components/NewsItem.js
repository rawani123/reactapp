import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageurl,newsurl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageurl?"https://techcrunch.com/wp-content/uploads/2021/12/android-spyware2.jpg?resize=1200,674":imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
          <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
