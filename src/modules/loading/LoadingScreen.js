import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';

class LoadingScreen extends Component {
  componentDidMount() {

  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default LoadingScreen;
