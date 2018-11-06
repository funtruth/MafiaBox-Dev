import React, { Component } from 'react';
import { connect } from 'react-redux'
import './styles.css';
import firebase from '../../services/firebase'
import { authType } from '../common/types'
import { updateAuthType } from '../user/UserReducer'

import { Redirect } from 'react-router-dom'

class AuthView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      redirect: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        alert('user exists')
        this.props.updateAuthType(authType.yes)
        this.setState({
          redirect: true
        })
      } else {
        alert('user no exists')
        this.props.updateAuthType(authType.no)
      }
    })
  }

  _login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .catch(error => {
        console.log('incorrect', error)
      })
  }

  _onUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  _onPassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  _redirectToHome() {
    if (!this.state.redirect) return null
    return <Redirect to="/board" push/>
  }

  render() {
    return (
      <div className="App">
        <header className="login-view">
          {this._redirectToHome()}
          <input value={this.state.username} className="login-box" 
            placeholder="Email or Username" type="text" onChange={this._onUsername}/>
          <input value={this.state.password} className="login-box"
            placeholder="Password" type="password" onChange={this._onPassword}/>
          <div className="login-button" onClick={this._login}>Login</div>
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
)(AuthView);
