import React from 'react'
import { fieldType } from '../defaults'

class InputField extends React.Component{
    _onChange = e => {
        const { pageInfo, fieldKey } = this.props
        const { pageKey } = pageInfo

        this.props.updatePage(pageKey, fieldKey, e.target.value)
    }

    render() {
        const { value, fieldInfo, fieldKey, inputType } = this.props

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