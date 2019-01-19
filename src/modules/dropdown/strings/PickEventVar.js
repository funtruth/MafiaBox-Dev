import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

import DropParent from '../components/DropParent'

class PickEventVar extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: item.key,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        const isObject = item.variableType === variableType.object.key

        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: item.key,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item)}
            >
                {item.key}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        const { attachVar } = this.props
        const vars = _.toArray(attachVar)

        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        if (!attachVar) return null
        return (
            <div>
                <div style={menuStyle}>
                    {vars.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(PickEventVar)