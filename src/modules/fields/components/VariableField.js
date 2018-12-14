import React from 'react'

import { dropdownType } from '../../dropdown/types';
import { fieldIcon } from '../defaults'

class VariableField extends React.Component{
    _renderItem = (item, index) => {
        const { pageInfo } = this.props
        const { pageKey } = pageInfo

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: item ? '#fff' : '#969696',
            marginBottom: 6,
        }

        return (
            <div
                key={index}
                className="property-button menu-onclick"
                menu-type={dropdownType.editVar}
                page-key={pageKey}
                tag-key={item}
                style={style}
            >
                {item || 'Untitled'}
            </div>
            
        )
    }

    _renderFooter() {
        const { pageInfo } = this.props
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
                style={style}
            >
                <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                {"Add"}
            </div>
        )
    }

    render() {
        const { fieldInfo, value } = this.props
        const { fieldKey } = fieldInfo
        
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