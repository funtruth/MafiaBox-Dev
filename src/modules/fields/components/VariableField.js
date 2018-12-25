import React from 'react'

import { dropdownType } from '../../dropdown/types';
import { fieldIcon } from '../defaults'
import { variableType } from '../../logic/types'

class VariableField extends React.Component{
    _renderItem = (item, index) => {
        const { pageInfo, fieldKey, value } = this.props
        const { pageKey } = pageInfo

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: item ? '#fff' : '#969696',
            marginBottom: 6,
        }

        const varType = value[item].variableType || variableType.any

        return (
            <div key={index} className="row">
                <i 
                    className={`${variableType[varType].icon || 'ion-md-create'} logic-label menu-onclick`}
                    menu-type={dropdownType.pickVarType}
                    page-key={pageInfo.pageKey}
                    field-key={fieldKey}
                    index-key={item}
                    current-value={varType}
                    style={{
                        color: '#fff',
                    }}
                />
                <div
                    className="property-button menu-onclick"
                    menu-type={dropdownType.editVar}
                    page-key={pageKey}
                    field-key={fieldKey}
                    tag-key={item}
                    style={style}
                >
                    {item || 'Untitled'}
                </div>
            </div>
        )
    }

    _renderFooter() {
        const { pageInfo, fieldKey } = this.props
        const { pageKey } = pageInfo

        const style = {
            backgroundColor: 'hsla(0,0%,100%,.1)',
            color: '#969696',
            marginBottom: 6,
            maxWidth: 130,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }

        return (
            <div
                className="property-button menu-onclick"
                menu-type={dropdownType.addVar}
                page-key={pageKey}
                field-key={fieldKey}
                style={style}
            >
                <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                {"Add"}
            </div>
        )
    }

    render() {
        const { fieldInfo, value, fieldKey } = this.props
        
        return (
            <div className="field-item">
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.tag}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || fieldKey}
                </div>
                <div className="row">
                    {value && Object.keys(value).map(this._renderItem)}
                </div>
                {this._renderFooter()}
            </div>
        )
    }
}

export default VariableField