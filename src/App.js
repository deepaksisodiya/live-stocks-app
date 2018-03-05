import React, { Component } from "react";
import moment from "moment";

import LiveStocks from "./Component/LiveStocks";

import "./App.css";

class App extends Component {
  state = {
    isError: false,
    isLoading: true,
    data: []
  };

  componentDidMount() {
    const socket = new WebSocket("ws://stocks.mnet.website");

    socket.onerror = error => {
      console.log("WebSocket Error: " + error);
      this.setState({
        isError: true,
        isLoading: false
      });
    };

    socket.onopen = event => {
      console.log("socket is open");
    };

    socket.onmessage = event => {
      this.onMessage(event);
    };
  }

  onMessage = event => {
    const message = JSON.parse(event.data);
    const data = {};

    message.forEach(([name, price]) => {
      const previousData = this.state.data[name];
      let color = "white";

      if (previousData) {
        if (previousData.price > price) {
          color = "red";
        } else {
          color = "green";
        }
      }

      const stockObj = {
        lastUpdate: moment().format("MMMM Do YYYY, h:mm:ss a"),
        name,
        price,
        color
      };

      data[name] = stockObj;
    });

    const newData = Object.assign({}, this.state.data, data);

    this.setState({
      data: newData,
      isLoading: false
    });
  };

  render() {
    const { data, isLoading, isError } = this.state;

    return (
      <div className="App">
        <p>Live Stocks App</p>
        <LiveStocks
          stocks={Object.values(data)}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    );
  }
}

export default App;
