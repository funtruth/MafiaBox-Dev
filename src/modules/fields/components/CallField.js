import React from 'react'

class CallField extends React.Component{
    _onChange = e => {
        const { fieldKey } = this.props
        this.props.updatePage(fieldKey, e.target.value)
    }

    render() {
        const { value } = this.props

        return (
            <input
                className="field-call-input"
                value={value || ''}
                onChange={this._onChange}
                placeholder="Untitled"
                type="text"
            />
        )
    }
}

export default CallField