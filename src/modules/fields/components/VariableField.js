import React from 'react'

import { dropdownType } from '../../dropdown/types';
import { variableType } from '../../logic/types'

class VariableField extends React.Component{
    _renderItem = (item, index) => {
        const { pageKey, fieldKey, value } = this.props

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: item ? '#fff' : '#969696',
            marginBottom: 6,
        }

        const varType = value[item].variableType || variableType.any

        return (
            <div key={index} className="row">
                <i 
                    className={`${variableType[varType].icon || 'ion-md-create'} logic-label app-onclick`}
                    menu-type={dropdownType.pickVarType}
                    app-onclick-props={JSON.stringify({
                        pageKey,
                        fieldKey,
                        indexKey: item,
                        currentValue: varType,
                    })}
                    style={{
                        color: '#fff',
                    }}
                />
                <div
                    className="property-button app-onclick"
                    menu-type={dropdownType.editVar}
                    app-onclick-props={JSON.stringify({
                        pageKey,
                        fieldKey,
                        tagKey: item,
                    })}
                    style={style}
                >
                    {item || 'Untitled'}
                </div>
            </div>
        )
    }

    _renderFooter() {
        const { pageKey, fieldKey } = this.props

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
                className="property-button app-onclick"
                menu-type={dropdownType.addVar}
                app-onclick-props={JSON.stringify({
                    pageKey,
                    fieldKey,
                })}
                style={style}
            >
                <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                {"Add"}
            </div>
        )
    }

    render() {
        const { value } = this.props
        
        return (
            <div>
                <div className="row">
                    {value && Object.keys(value).map(this._renderItem)}
                </div>
                {this._renderFooter()}
            </div>
        )
    }
}

export default VariableField