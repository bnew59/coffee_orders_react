import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderedOrders: []
    }
    this.testapi()
  }
  createOrder = async (e) => {
    console.log('dsfads')
    e.preventDefault()
    var result = await axios.post("/api/create/order", { name: "bob", type: "frappe"})
    console.log(result.data)


  }

  testapi = () => {
    axios.get("http://localhost:5000/api/orders").then ((response)=>{
      console.log(response.data)

      // if statement to make sure the data actually exists before accessing it
      if (response && response.data) {
        // same thing here, makes sure moviesArray is on the response.data
        if (response.data.orders) {

          // this becomes an array of react components
          var renderedOrders = []

          // this is the actual array of movie data
          var theOrders = response.data.orders

          // this iterates over each movie object, builds a jsx react component with values from that data
          // pushes the "rendered component into the renderedMovies array"
          theOrders.map(function (anOrder) {
            renderedOrders.push(<div>customer: {anOrder.name} coffe: {anOrder.coffeeType} </div>)
          })

          // takes the array that contains the jsx components and sets it on state, for the render method of this class to accrss
          this.setState({
           
            renderedOrders: renderedOrders
          })
        }
      } 
      
    })
  }
  render() {
    
      return (<div className="App">
    
        <header className="App-header">
        <button onClick={this.createOrder}>test</button>
        {this.state.renderedOrders}
      
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
