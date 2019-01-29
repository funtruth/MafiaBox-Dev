import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as proptool from '../../logic/proptool'
import { variableType, updateViewType } from '../../logic/types'

import DropParent from '../components/DropParent'
import UpdateType from './UpdateType';
import { VAR_DEFAULTS } from '../types';

//TODO this is not real XD
class PickChoice extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key,
            updateViewType: updateViewType.uid,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue, updateRef, subfieldKey } = this.props
        const newKey = `${subfieldKey}.${item.key}`
        
        const config = proptool.getUpdateConfig(newKey, updateRef)
        const chosen = typeof currentValue === 'string' && currentValue === item

        if (!config || config.hideButton) {
            return (
                <div
                    key={item.key}
                    className="drop-down-menu-option"
                    chosen={chosen.toString()}
                    onClick={this._select.bind(this, item)}
                >
                    {item.key}
                    <i className="mdi mdi-check"/>
                </div>
            )
        }
    
        return (
            <DropParent
                {...this.props}
                key={item.key}
                dropdownType={config.dropdown}
                params={{
                    subfieldKey: newKey,
                }}
                text={item.key}
            />
        )
        
    }

    render() {
        const { attachVar, subfieldKey } = this.props
        const uids = _.filter(attachVar, i => i.variableType === variableType.uid.key)
        const fields = proptool.getSubfields(subfieldKey, this.props.updateRef)
        
        return (
            <div>
                {uids.length ?
                    <div>
                        {uids.map(this._renderItem)}
                    </div>
                    :<div className="drop-down-empty">
                        no UIDs found
                    </div>}
                {!fields.length && <UpdateType {...this.props}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
        update: state.template.update,
        mutate: state.template.mutate,
    }),
)(PickChoice)