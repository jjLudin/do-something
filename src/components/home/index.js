import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import Search from './search';
import Result from './result';
import Spinner from '../spinner';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: 0,
      results: []
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.getReps = this.getReps.bind(this);
  }

  render() {
    const { results } = this.state;

    return(
      <div className="Home">
        <Search getReps={this.getReps} changeHandler={this.changeHandler}></Search>
        <Spinner />
        <Result results={results}></Result>
      </div>
    );
  }

  changeHandler = (event) => {
    this.setState({ zipcode: event.target.value });
  }

  getReps = (event) => {
    event.preventDefault();

    let url = process.env.REACT_APP_REP_ENDPOINT;
    let request = url + this.state.zipcode;

    // Track promise to use the loading spinner
    trackPromise(
      // Fetch request to the API
      fetch(request, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        // Error handling if request error
        if (response.ok) {
          return response.clone().json();
        }
      })
      .then(results => {
        this.setState({ results: results });
      })
      .catch(error => {
        console.log(error);
      })
    );
  }
}

export default Home;