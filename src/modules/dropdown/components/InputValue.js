import React from 'react'
import { connect } from 'react-redux'

class InputValue extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.dropdownParams.showValue && props.dropdownData
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dropdownParams.showValue !== this.props.dropdownParams.showValue) {
            this.setState({
                value: newProps.dropdownParams.showValue && newProps.dropdownData
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
        const { dropdownParams } = this.props
        dropdownParams.onSubmit(this.state.value)
    }

    render() {
        const { dropdownParams } = this.props
        const { type, inputText } = dropdownParams
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