import React from 'react'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

class PickTimer extends React.Component{
    constructor(props) {
        super(props)
        const timer = (props.attach[props.subfieldKey] && props.attach[props.subfieldKey].value) || 0
        this.state = {
            min: Math.floor(timer / 60 / 1000),
            sec: timer % 60000 / 1000,
        }
    }

    _onMin = (e) => {
        this.setState({
            min: e.target.value,
        })
    }
    
    _onSec = (e) => {
        this.setState({
            sec: e.target.value,
        })
    }

    _onFocus = () => {
        const { min, sec } = this.state
        if (sec > 60) {
            this.setState({
                min: min + Math.floor(sec / 60),
                sec: sec % 60,
            })
        }
    }

    _onSave = () => {
        const { min, sec } = this.state
        const timer = (60 * parseInt(min) + parseInt(sec)) * 1000
        
        this.props.updatePage({
            ...VAR_DEFAULTS,
            value: timer,
            updateType: updateType.timer,
        })
        this.props.showDropdown()
    }

    render() {
        const { min, sec } = this.state
        
        return (
            <div>
                <DropTitle>set a timer</DropTitle>
                <div className="row" style={{ justifyContent: 'center' }}>
                    <input
                        className="field-time-input border-right"
                        value={min || ''}
                        placeholder="00m"
                        type="number"
                        onChange={this._onMin}
                        onFocus={this._onFocus}
                    />
                    <input
                        className="field-time-input"
                        value={sec || ''}
                        placeholder="00s"
                        type="number"
                        onChange={this._onSec}
                        onFocus={this._onFocus}
                    />
                </div>
                <div className="-sep"/>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onSave}
                >
                    <i className="drop-down-menu-icon mdi mdi-content-save"/>
                    save
                </div>
            </div>
        )
    }
}

export default PickTimer