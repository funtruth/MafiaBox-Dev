import React from 'react'
import _ from 'lodash'

import { updateType, updateFamilyType } from '../../logic/types'
import { VAR_DEFAULTS } from '../types';

import UpdateType from './UpdateType'
import DropTitle from '../components/DropTitle';

class PickHealth extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            updateViewType: item.updateViewType,
            value: item.key,
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
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    render() {
        let items = _.filter(updateType, i => i.family === updateFamilyType.health)
        items = _.sortBy(items, i => i.index)

        return (
            <div>
                <DropTitle>health type</DropTitle>
                {items.map(this._renderItem)}
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default PickHealth