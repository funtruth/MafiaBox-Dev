import React from 'react'
import './shell.css'

const remote = window.require('electron').remote;

export default class Shell extends React.Component {
    _onMin = () => {
      const window = remote.getCurrentWindow();
      window.minimize(); 
    }

    _onMax = () => {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }	 
    }

    _onClose = () => {
      const window = remote.getCurrentWindow();
      window.close();
    }

    render() {
        return (
          <div className="window">
            <div className="shell">
              <div className="shell-button" id="min-btn" onClick={this._onMin}>
                <i className="shell-icon mdi mdi-minus"></i>
              </div>
              <div className="shell-button" id="max-btn" onClick={this._onMax}>
                <i className="shell-icon mdi mdi-crop-square" style={{ fontSize: 12 }}></i>
              </div>
              <div className="shell-button-red" id="close-btn" onClick={this._onClose}>
                <i className="shell-icon mdi mdi-close"></i>
              </div>
            </div>
            {this.props.children}
          </div>
        )
    }
}