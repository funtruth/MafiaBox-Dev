import React from 'react'
import { fieldTypeToTitle } from '../defaults'

class TemplateTitle extends React.Component{
    _onChange = e => {
        const { fieldKey } = this.props.fieldInfo
        this.props.updateField(fieldKey, 'fieldTitle', e.target.value)
    }

    render() {
        const { fieldInfo } = this.props
        const { fieldTitle, fieldType } = fieldInfo

        return (
            <div className="row">
                <input
                    className="field-title-input"
                    value={fieldTitle || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type="text"
                />
                <div
                    className="tag-button"
                >{fieldTypeToTitle[fieldType]}</div>
            </div>
        )
    }
}

export default TemplateTitle