import React from 'react'
import _ from 'lodash'

import { updateType, updateViewType, updateFamilyType } from '../../logic/types'
import { dropdownType, VAR_DEFAULTS } from '../types'

import DropParent from '../components/DropParent'
import UpdateType from './UpdateType'
import DropTitle from '../components/DropTitle';

class PickUpdate extends React.Component{
    _selectDynamic = (item, number) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key,
            dynamic: number,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }
    
    _select = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key
        
        if (item.updateViewType === updateViewType.dynamicVal) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: chosen,
                        onSubmit: this._selectDynamic.bind(this, item),
                    }}
                    icon={item.icon}
                    text={item.title}
                    chosen={chosen}
                />
            )
        }

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
        const items = _(updateType)
            .filter(i => i.family === updateFamilyType.number)
            .sortBy(i => i.index)
            .value()

        return (
            <div>
                <DropTitle>update value</DropTitle>
                {items.map(this._renderItem)}
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default PickUpdate