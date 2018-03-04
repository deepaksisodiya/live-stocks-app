import React, { Component } from "react";

import LiveStocks from "./Component/LiveStocks";

import "./App.css";

class App extends Component {
  state = {
    isError: false,
    isLoading: true,
    data: []
  };

  componentDidMount() {
    var socket = new WebSocket("ws://stocks.mnet.website");

    socket.onerror = error => {
      console.log("WebSocket Error: " + error);
      this.setState({
        isError: true,
        isLoading: false,
      });
    };

    socket.onopen = event => {
      console.log("socket is open");
    };

    socket.onmessage = event => {
      console.log("event ", event);

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
        isLoading: false,
      });
    };
  }

  render() {
    const { data, isLoading, isError } = this.state;

    console.log("data ", data);
    return (
      <div className="App">
        <p>Live Stocks App</p>
        <LiveStocks stocks={data} isLoading={isLoading} isError={isError} />
      </div>
    );
  }
}

export default App;
