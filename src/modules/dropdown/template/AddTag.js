import React from 'react'
import { connect } from 'react-redux'

import { addTag } from '../../fields/FieldReducer'

class AddTag extends React.Component{
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
        if (true) {
            this.props.addTag(this.props.fieldKey, this.state.value)
            this.props.showDropdown()
        } else {

        }
    }

    render() {
        return (
            <div>
                <input
                    className="tag-input"
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="-sep"/>
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
        addTag,
    }
)(AddTag)