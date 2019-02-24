import React from 'react'
import _ from 'lodash'

import { variableType, updateViewType } from '../../logic/types'
import { VAR_DEFAULTS } from '../types';

import UpdateType from './UpdateType';
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty'

class PickChoice extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key || "$\"\"", //HACK
            updateViewType: updateViewType.uid,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

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

    render() {
        const { attachVar, attach, subfieldKey } = this.props

        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === "$\"\""

        const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
        
        return (
            <div>
                <DropTitle>uids</DropTitle>
                <div>
                    {uids.map(this._renderItem)}
                    <DropEmpty>no UIDS found</DropEmpty>
                </div>
                <DropTitle>options</DropTitle>
                <div
                    className="drop-down-menu-option"
                    chosen={chosen.toString()}
                    onClick={this._select}
                >
                    <i className="drop-down-menu-icon mdi mdi-message-bulleted-off"/>
                    no choice
                    <i className="mdi mdi-check"/>
                </div>
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default PickChoice