import React from 'react'
import { fieldIcon } from '../defaults'

class InputField extends React.Component{
    _onChange = e => {
        const { pageInfo, field } = this.props
        const { pageKey } = pageInfo

        this.props.updatePage(pageKey, field, e.target.value)
    }

    render() {
        const { value, fieldInfo, field, inputType } = this.props

        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.text}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <input
                    className="page-input"
                    value={value}
                    onChange={this._onChange}
                    placeholder="Empty"
                    type={inputType}
                />
            </div>
        )
    }
}

export default InputField