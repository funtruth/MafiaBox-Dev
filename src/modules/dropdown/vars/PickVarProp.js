import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { showDropdown, popDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVarProp extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey, prefix } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: `${prefix}.${item}`,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdown()
    }

    _onShowProps = (item, e) => {
        const { prefix, forcedKey } = this.props
        
        this.props.showDropdown(dropdownType.pickVarProp, e, {
            prefix: `${prefix}.${item}`,
            forcedKey: (forcedKey || 0) + 1,
        })
    }
    
    _onMouseOut = (dropdownType, e) => {
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdown(dropdownType)
        }
    }

    _renderItem = (item) => {
        const { currentValue, prefix, updateRef } = this.props
        const selected = typeof currentValue === 'string' && currentValue === `${prefix}.${item}`
        
        const vars = proptool.getSubfields(`${prefix}.${item}`, updateRef)
        const isObject = vars.length > 0
        
        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={isObject ? undefined : this._onSelect.bind(this, item)}
                onMouseOver={isObject ? this._onShowProps.bind(this, item) : undefined}
                onMouseOut={isObject ? this._onMouseOut.bind(this, dropdownType.pickVarProp) : undefined}
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
                {selected && <i className="ion-md-checkmark"/>}
            </div>
        )
    }
    
    render() {
        const { updateRef, prefix, attach } = this.props
        const subfields = proptool.getSubfields(prefix, updateRef)
        const uids = _.filter(attach, i => i.variableType === variableType.uid.key)
        
        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        return (
            <div style={menuStyle}>
                {subfields.length ?
                    subfields[0] === '$' ?
                        uids.map(item => this._renderItem(`$${item.key}`))
                        :subfields.map(this._renderItem)
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
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        updatePageByPath,
        showDropdown,
        popDropdown,
    }
)(PickVarProp)