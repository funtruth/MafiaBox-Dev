import React from 'react'
import { fieldTypeToTitle } from '../defaults'
import { dropdownType } from '../../dropdown/types';

class TemplateTitle extends React.Component{
    _onChange = e => {
        const { fieldKey } = this.props.fieldInfo
        this.props.updateField(fieldKey, 'fieldTitle', e.target.value)
    }

    render() {
        const { fieldInfo, fieldMapKey } = this.props
        const { fieldKey, fieldTitle, fieldType } = fieldInfo

        return (
            <div className="row" style={{ alignItems: 'center' }}>
                <div
                    className="tag-button menu-onclick"
                    menu-type={dropdownType.pickFieldType}
                    field-key={fieldKey}
                >{fieldTypeToTitle[fieldType]}</div>
                <input
                    className="field-title-input"
                    value={fieldTitle || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type="text"
                >
                </input>
                <i className="story-option ion-ios-more menu-onclick"
                    menu-type={dropdownType.templateTitleOptions}
                    field-key={fieldKey}
                    page-key={fieldMapKey}
                    style={{
                        fontSize: 16,
                        marginLeft: 'auto',
                    }}>
                </i>
            </div>
        )
    }
}

export default TemplateTitle