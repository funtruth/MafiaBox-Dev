import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { showDropdownByKey, popDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVarProp extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey, prefix } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: `${prefix}.${item}`,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { currentValue, prefix } = this.props
        const selected = typeof currentValue === 'string' && currentValue === `${prefix}.${item}`
        const isObject = item.variableType === variableType.object.key
        
        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={isObject ? undefined : this._onSelect.bind(this, item)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6'
                }}
            >
                {item}
                {isObject && <i
                    className="ion-ios-play"
                    style={{
                        marginLeft: 'auto',
                    }}
                />}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{
                        marginLeft: 'auto',
                        width: 30,
                        textAlign: 'center',
                    }}
                />}
            </div>
        )
    }
    
    render() {
        const { updateRefs, prefix } = this.props
        const vars = proptool.getSubfields(prefix, updateRefs)
        console.log(this.props)
        //TODO i don't like this as an array
        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        return (
            <div style={menuStyle}>
                {vars.length ?
                    vars.map(this._renderItem)
                    :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                        There are no props
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRefs: state.template.updateRefs,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
        popDropdownByKey,
    }
)(PickVarProp)