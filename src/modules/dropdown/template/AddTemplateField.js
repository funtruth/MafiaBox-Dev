import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { addField } from '../../fields/FieldReducer'

class AddTemplateField extends React.Component{
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
            this.props.addField(this.props.dropdownParams.fieldKey, this.state.value)
            this.props.showDropdownByKey()
        } else {

        }
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
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
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        fieldRepo: state.field.fieldRepo,
        tagRepo: state.field.tagRepo,
    }),
    {
        showDropdownByKey,
        addField,
    }
)(AddTemplateField)