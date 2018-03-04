import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    var socket = new WebSocket('ws://stocks.mnet.website');

    socket.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
    };
  
    socket.onopen = function(event) {
      console.log('socket is open')
    };

    socket.onmessage = function(event) {
      console.log('on message ', event.data);
    };
  }


  render() {
    return (
      <div className="App">
        <p className="App-intro">
          live stock app
        </p>
      </div>
    );
  }
}

export default App;
