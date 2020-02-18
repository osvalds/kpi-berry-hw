import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends  Component {
  state = {
    enums: null
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/enums')
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ enums: data })
        })
        .catch(console.log)
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
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
