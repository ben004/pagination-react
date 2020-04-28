import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
    };
  }
  componentDidMount() {
    this.receivedData();
  }
  receivedData() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      const data = res.data;
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        data: data
      });
    });
  }
  postData() {
    const slice = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    return (
      <ol>
        {slice.map((pd, index) => {
          return <li key={index}>{pd.title}</li>;
        })}
      </ol>
    );
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  handlechange(e) {
    let array = [10,20,25]
    this.setState({
      perPage: array[e.target.value],
    });
  }
  render() {
    return (
      <div>
        <select onClick={(e) => this.handlechange(e)}>
          <option value={0}>10</option>
          <option value={1}>20</option>
          <option value={2}>25</option>
        </select>
        {this.postData()}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          itemsCountPerPage={this.state.perPage}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={(e) => this.handlePageClick(e)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
