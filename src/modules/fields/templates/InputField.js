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
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldType.text.icon}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || fieldKey}
                </div>
                <input
                    className="page-input"
                    value={value || ''}
                    onChange={this._onChange}
                    placeholder="Empty"
                    type={inputType}
                />
            </div>
        )
    }
}

export default InputField