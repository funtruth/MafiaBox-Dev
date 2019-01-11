import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateType, updateViewType, updateFamilyType } from '../../logic/types'
import { dropdownType } from '../types'

import { updatePageByPath } from '../../page/PageReducer'

import DropParent from '../components/DropParent'
import UpdateType from './UpdateType'

class PickUpdate extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            value: item.key,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }

    _selectDynamic = (item, number) => {
        this.props.updatePage({
            value: item.key,
            dynamic: number,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }
    
    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const currentValue = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        
        if (item.updateViewType === updateViewType.dynamicVal) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        hoverKey: item.key,
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: chosen,
                        attach,
                        onSubmit: this._selectDynamic.bind(this, item)
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
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        let items = _.filter(updateType, i => i.family === updateFamilyType.number)
        items = _.sortBy(items, i => i.index)

        return (
            <div>
                {items.map(this._renderItem)}
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        update: state.template.update,
        mutate: state.template.mutate,
    }),
    {
        updatePageByPath,
    }
)(PickUpdate)