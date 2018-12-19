import React from 'react'
import { connect } from 'react-redux'

class InputValue extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.showValue && props.dropdownData
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showValue !== this.props.showValue) {
            this.setState({
                value: newProps.showValue && newProps.dropdownData
            })
        }
    }

    _onType = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this._onSubmit()
                break
            default:
        }
    }

    _onSubmit = () => {
        this.props.onSubmit(this.state.value)
    }

    render() {
        const { type, inputText } = this.props

        return (
            <div>
                <input
                    className="tag-input menu-voidclick"
                    value={this.state.value || ''}
                    onChange={this._onType}
                    onKeyDown={this._onKeyDown}
                    placeholder={inputText || "Set value"}
                    type={type || "number"}
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._onSubmit}>
                    <i className={`drop-down-menu-icon mdi mdi-content-save-settings`}></i>
                    Save
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownData: state.dropdown.dropdownData,
    }),
)(InputValue)