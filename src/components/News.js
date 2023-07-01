import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps={
    country:"us",
    pagesize:8,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string, 
    pagesize:PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    console.log();
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=854797a0aa5145f8bbcb47fb9a71950e&page=1&pagesize=${this.props.pagesize}`;
      this.setState({
        loading:true
      })
    let data = await fetch(url);
    let parsedata = await data.json();

    this.setState({ articles: parsedata.articles,
      totalarticle:parsedata.totalresults,
      loading:false
    });
  }

  handlenextclick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalarticle/this.props.pagesize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=854797a0aa5145f8bbcb47fb9a71950e&page=${
      this.state.page + 1
    }&pagesize=${this.props.pagesize}`;
    this.setState({
      loading:true
    });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedata.articles,
      loading:false
    });
    }
  };

  handlepreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=854797a0aa5145f8bbcb47fb9a71950e&page=${
      this.state.page - 1
    }&pagesize=${this.props.pagesize}`;
    this.setState({
      loading:true
    })

    
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading:false
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'35ps 0px'}}>This are News of News app</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          { this.state.loading || this.state.articles.map((element) => {
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlepreviousclick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalarticle/this.props.pagsize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
