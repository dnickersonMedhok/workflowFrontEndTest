import React, { Component } from 'react';
import logo from './resources/MEDHOK-Logo-Blue.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo}  alt="logo" />
          <p>
            Workflow test
          </p>
        </header>
      </div>
    );
  }
}

export default App;
