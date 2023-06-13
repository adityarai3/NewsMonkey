import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'science'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async UpdateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=70d5240b6ff7477d863fc720b07a935b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedDAta = await data.json()
    this.setState({
      articles: parsedDAta.articles,
      totalResults: parsedDAta.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    this.UpdateNews();
  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.UpdateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.UpdateNews();
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey-Find News Here!!!</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt}></NewsItem>
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
