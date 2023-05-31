import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
 
  constructor() {
    super();
    
    this.state = {
      articles: [],
      loading: true,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=854797a0aa5145f8bbcb47fb9a71950e";
    let data = await fetch(url);
    let parsedata = await data.json();
   
    this.setState({ articles: parsedata.articles });
  }
  render() {
    return (
      <div className="container my-3">
        <h2>This are News of News app</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
