import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType, panelType } from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';

class PickVarProp extends React.Component{
    _onSelect = (item) => {
        const { prefix } = this.props
        
        this.props.updatePage({
            value: `${prefix}.${item}`,
            adjust: null,
            type: panelType.var.key,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue, prefix, updateRef } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === `${prefix}.${item}`
        
        const vars = proptool.getSubfields(`${prefix}.${item}`, updateRef)
        const isObject = vars.length > 0
        
        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: `${prefix}.${item}`,
                    }}
                    text={item}
                />
            )
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item)}
            >
                {item}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
    
    render() {
        const { updateRef, prefix, attachVar } = this.props
        const subfields = proptool.getSubfields(prefix, updateRef)
        const uids = _.filter(attachVar, i => i.variableType === variableType.uid.key)

        return (
            <div className="drop-down-scrollable">
                {subfields.length ?
                    subfields[0].subfield === '$' ?
                        <div>
                            <DropTitle>uids</DropTitle>
                            {uids.map(item => this._renderItem(`${item.key}`))}
                        </div>
                        :<div>
                            <DropTitle>subfields</DropTitle>
                            {subfields.map(item => this._renderItem(item.subfield))}
                        </div>
                    :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                        no subfields found
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
)(PickVarProp)