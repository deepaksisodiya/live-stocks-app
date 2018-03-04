import React, { Component } from "react";

import LiveStocks from "./Component/LiveStocks";

import "./App.css";

class App extends Component {
  state = {
    error: false,
    data: []
  };

  componentDidMount() {
    var socket = new WebSocket("ws://stocks.mnet.website");

    socket.onerror = (error) => {
      console.log("WebSocket Error: " + error);
    };

    socket.onopen = (event) => {
      console.log("socket is open");
    };

    socket.onmessage = (event) => {
      const data = [];
      const message = JSON.parse(event.data);

      message.forEach(([name, price]) => {
        const obj = {
          name,
          price
        };
        data.push(obj);
      });
      
      this.setState({
        data,
      });
    };
  }

  render() {
    console.log('data ', this.state.data);
    return (
      <div className="App">
        <p className="App-intro">live stock app</p>
      </div>
    );
  }
}

export default App;
