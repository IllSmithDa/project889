import React, { Component } from 'react';
import axios from 'axios';
import ReqURL from './ReqURL';
axios.defaults.withCredentials = true;
export default class Liberal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [],
      searchTerm: '',
    }
  }
  componentDidMount() {
    // console.log(this.props.topic)
    this.setState({ searchTerm: this.props.topic.replace(/%20/g, ' ')});
    const searchItem = this.props.topic.replace(/%20/g, ' ');
    console.log(searchItem);
    const searchTerm = {searchTerm: searchItem};
    axios
      .post(`${ReqURL}/getLiberalBias`, searchTerm)
      .then((data) => {
        this.setState({ newList: data.data });
        
        console.log(this.state.newList);
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return(
      <div className="liberal-container">
        <h1 className="liberal-header"> Liberal </h1>
        <div>
          {this.state.newList.map((data) => {
            return(
            <div>
              <h4><br /><b>{data.title}</b></h4>
              <p> Published on: {data.pubDate}</p>
              <p> Source: {data.publisher}</p>
              <a href={data.link}> link: {data.link}</a>
              <p> <br /><b>Description:</b> {data.description}</p>
            </div>
            );
          })}
        </div> 
      </div>
    )
  }
}
