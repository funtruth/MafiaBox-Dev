import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { variableType, updateViewType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

import DropParent from '../components/DropParent'
import UpdateType from './UpdateType';

class PickUid extends React.Component{
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
                    {chosen && <i className="ion-md-checkmark"/>}
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

    _select = (item) => {
        this.props.updatePage({
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key,
            updateViewType: updateViewType.uid,
        })
        this.props.showDropdown()
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
                    :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                        There are no Unique IDs
                    </div>}
                {!fields.length && <UpdateType {...this.props}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
        update: state.template.update,
        mutate: state.template.mutate,
    }),
    {
        updatePageByPath,
    }
)(PickUid)