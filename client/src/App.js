import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesArray: null
    }
  }
  testapi = () => {
    axios.get("http://localhost:5000/api/movies").then ((response)=>{
      console.log(response.data)

      // if statement to make sure the data actually exists before accessing it
      if (response && response.data) {
        // same thing here, makes sure moviesArray is on the response.data
        if (response.data.moviesArray) {

          // this becomes an array of react components
          var renderedMovies = []

          // this is the actual array of movie data
          var movies = response.data.moviesArray

          // this iterates over each movie object, builds a jsx react component with values from that data
          // pushes the "rendered component into the renderedMovies array"
          movies.map(function (movie) {
            renderedMovies.push(<div>title: {movie.title}</div>)
          })

          // takes the array that contains the jsx components and sets it on state, for the render method of this class to accrss
          this.setState({
           
            renderedMovies: renderedMovies
          })
        }
      } 
      
    })
  }
  render() {
    this.testapi()
      return (<div className="App">
    
        <header className="App-header">
        {this.state.renderedMovies}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
