import React from 'react'
import { fieldType as types } from '../defaults'
import { dropdownType } from '../../dropdown/types';

class TemplateTitle extends React.Component{
    _onChange = e => {
        const { key } = this.props.fieldInfo
        this.props.updateField(key, 'title', e.target.value)
    }

    render() {
        const { fieldInfo, boardType } = this.props
        const { key, title, fieldType } = fieldInfo

        return (
            <div className="row" style={{ alignItems: 'center' }}>
                <div
                    className="tag-button app-onclick"
                    menu-type={dropdownType.pickFieldType}
                    app-onclick-props={JSON.stringify({
                        fieldKey: key,
                    })}
                >
                    {types[fieldType].title}
                </div>
                <input
                    className="field-title-input"
                    value={title || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type="text"
                >
                </input>
                <i className="story-option ion-ios-more app-onclick"
                    menu-type={dropdownType.templateTitleOptions}
                    app-onclick-props={JSON.stringify({
                        pageKey: boardType,
                        fieldKey: key,
                    })}
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