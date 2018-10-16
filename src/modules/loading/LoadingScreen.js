import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './styles.css';
import firebase from '../../services/firebase'
import { authType } from '../common/types'
import { updateAuthType } from '../user/UserReducer'

class LoadingScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateAuthType(authType.yes)
      } else {
        this.props.updateAuthType(authType.no)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="login-box" placeholder="Email or Username ..." style={{ marginBottom: '5px' }} type="text"/>
          <input className="login-box" placeholder="Password ..." type="password"/>
          <div className="login-button"/>
        </header>
      </div>
    );
  }
}

export default connect(
  null,
  {
    updateAuthType,
  }
)(LoadingScreen);
