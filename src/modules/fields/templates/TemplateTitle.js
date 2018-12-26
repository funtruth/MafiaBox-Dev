import React from 'react'
import { fieldType as types } from '../defaults'
import { dropdownType } from '../../dropdown/types';

class TemplateTitle extends React.Component{
    _onChange = e => {
        const { fieldKey } = this.props.fieldInfo
        this.props.updateField(fieldKey, 'fieldTitle', e.target.value)
    }

    render() {
        const { fieldInfo, boardType } = this.props
        const { fieldKey, fieldTitle, fieldType } = fieldInfo

        return (
            <div className="row" style={{ alignItems: 'center' }}>
                <div
                    className="tag-button menu-onclick"
                    menu-type={dropdownType.pickFieldType}
                    field-key={fieldKey}
                >{types[fieldType].title}</div>
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
                    page-key={boardType}
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