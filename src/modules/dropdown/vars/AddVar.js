import React from 'react'
import { connect } from 'react-redux'

import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class AddVar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this._confirm()
                break
            default:
        }
    }

    _confirm = () => {
        const { pageKey, fieldKey } = this.props
        const { value } = this.state
        
        if (true) {
            this.props.updatePageByPath(pageKey, fieldKey, value, { key: value, variableType: variableType.any.key })
            this.props.showDropdown()
        } else {

        }
    }

    render() {
        return (
            <div>
                <input
                    className="tag-input menu-voidclick"
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._confirm}>
                    <i className={`drop-down-menu-icon ion-md-checkbox`}></i>
                    Create
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(AddVar)