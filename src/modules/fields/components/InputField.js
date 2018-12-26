import React from 'react'

class InputField extends React.Component{
    _onChange = e => {
        const { pageInfo, fieldKey } = this.props
        const { pageKey } = pageInfo

        this.props.updatePageByPath(pageKey, fieldKey, e.target.value)
    }

    render() {
        const { value, inputType } = this.props

        return (
            <input
                className="page-input"
                value={value || ''}
                onChange={this._onChange}
                placeholder="Empty"
                type={inputType}
            />
        )
    }
}

export default InputField