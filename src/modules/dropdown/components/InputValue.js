import React from 'react'

class InputValue extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.showValue && props.attach
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showValue !== this.props.showValue) {
            this.setState({
                value: newProps.showValue && newProps.attach
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
                    className="tag-input"
                    value={this.state.value || ''}
                    onChange={this._onType}
                    onKeyDown={this._onKeyDown}
                    placeholder={inputText || "Set value"}
                    type={type || "number"}
                    autoFocus
                />
                <div className="-sep"/>
                <div className="drop-down-menu-option" onClick={this._onSubmit}>
                    <i className="drop-down-menu-icon mdi mdi-checkbox-marked"></i>
                    save
                </div>
            </div>
        )
    }
}

export default InputValue