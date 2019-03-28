import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as proptool from '../../logic/proptool'
import { variableType, updateViewType } from '../../logic/types'
import { VAR_DEFAULTS } from '../types';

import DropParent from '../components/DropParent'
import UpdateType from './UpdateType';
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

class PickUid extends React.Component{
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
        const { attach, updateRef, subfieldKey } = this.props
        const newKey = `${subfieldKey}_${item.key}`
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key
        
        const config = proptool.getUpdateConfig(newKey, updateRef)

        if (!config) {
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
                    subpath: [newKey],
                }}
                text={item.key}
            />
        )
        
    }

    render() {
        const { attachVar, subfieldKey } = this.props
        const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
        const fields = proptool.getSubfields(subfieldKey, this.props.updateRef)
        
        return (
            <>
                <DropTitle>uids</DropTitle>
                {uids.map(this._renderItem)}
                <DropEmpty>no UIDS found</DropEmpty>
                {!fields.length && <UpdateType {...this.props}/>}
            </>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(PickUid)