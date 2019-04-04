import React from 'react'
import _ from 'lodash'

import {
    updateType,
    updateFamilyType,
    panelType,
    variableType,
    VAR_DEFAULTS,
} from '../../logic/types'

import UpdateType from './UpdateType';
import DropTitle from '../components/DropTitle';

class PickBoolean extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            panelType: panelType.var.key,
            updateViewType: item.updateViewType,
            value: item.key,
            variableTypes: [variableType.boolean.key],
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const value = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof value === 'string' && value === item.key
        
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
        let items = _(updateType)
            .filter(i => i.family === updateFamilyType.boolean)
            .sortBy(i => i.index)
            .value()
        
        return (
            <div>
                <DropTitle>boolean type</DropTitle>
                {items.map(this._renderItem)}
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default PickBoolean