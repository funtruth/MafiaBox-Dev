import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickVarProp extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey, prefix } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: `${prefix}.${item.subfield}`,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdown()
    }

    _onShowProps = (item, e) => {
        const { prefix } = this.props
        
        this.props.showDropdown(dropdownType.pickVarProp, e, {
            prefix: `${prefix}.${item.subfield}`,
        })
    }
    
    _onMouseOut = e => {
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdownTo()
        }
    }

    _renderItem = (item) => {
        const { currentValue, prefix, updateRef } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === `${prefix}.${item}`
        
        const vars = proptool.getSubfields(`${prefix}.${item}`, updateRef)
        const isObject = vars.length > 0
        
        return (
            <div
                key={item}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={isObject ? undefined : this._onSelect.bind(this, item)}
                onMouseOver={isObject ? this._onShowProps.bind(this, item) : undefined}
                onMouseOut={isObject ? this._onMouseOut : undefined}
            >
                {item}
                {isObject && <i
                    className="ion-ios-play"
                    style={{
                        marginLeft: 'auto',
                    }}
                />}
                {chosen && <i className="ion-md-checkmark"/>}
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
                    subfields[0].subfield === '$' ?
                        uids.map(item => this._renderItem(`$${item.key}`))
                        :subfields.map(item => this._renderItem(item.subfield))
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
    }
)(PickVarProp)