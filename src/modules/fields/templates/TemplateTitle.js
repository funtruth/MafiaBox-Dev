import React from 'react'

class TemplateTitle extends React.Component{
    _onChange = e => {
        const { fieldKey } = this.props.fieldInfo
        this.props.updateField(fieldKey, 'fieldTitle', e.target.value)
    }

    render() {
        const { fieldInfo } = this.props

        return (
            <div>
                <input
                    className="field-title-input"
                    value={fieldInfo.title || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type="text"
                    autoFocus={true}
                />
            </div>
        )
    }
}

export default TemplateTitle