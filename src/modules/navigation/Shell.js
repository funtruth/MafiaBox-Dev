import React from 'react'
import './shell.css'

const remote = window.require('electron').remote;

class Shell extends React.Component {
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
            <div style={{ width: '100%' }}/>
            <div className="shell-button" id="min-btn" onClick={this._onMin}>
              <i class="shell-icon ion-md-remove"></i>
            </div>
            <div className="shell-button" id="max-btn" onClick={this._onMax}>
              <i class="shell-icon ion-md-square-outline" style={{ fontSize: 12 }}></i>
            </div>
            <div className="shell-button-red" id="close-btn" onClick={this._onClose}>
              <i class="shell-icon ion-md-close"></i>
            </div>
          </div>
        )
    }
}

export default Shell