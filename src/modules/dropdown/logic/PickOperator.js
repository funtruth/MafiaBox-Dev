import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

import { logicType, logicTypeInfo } from '../../logic/types'

class PickOperator extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const selected = item === currentValue

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                }}
            >
                <i className={`${logicTypeInfo[item].icon} drop-down-menu-icon`}/>
                {logicTypeInfo[item].title}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{
                        marginLeft: 'auto',
                        width: 30,
                        textAlign: 'center',
                    }}
                />}
            </div>
        )
    }

    _select = (newValue) => {
        const { pageKey, fieldKey, indexKey, pageRepo } = this.props
        
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])

        valueClone[indexKey].logicType = newValue
        switch(newValue) {
            case logicType.operator:
            case logicType.update:
                valueClone[indexKey].data = {}
                break
            default:
                valueClone[indexKey].data = ''
        }
        
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    _addItemBelow = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.addItemBelowOf(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    _deleteItem = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    render() {
        //TODO proper object
        let logicMenu = [
            logicType.if,
            logicType.else,
            logicType.elseif,
            logicType.operator,
            logicType.function,
            logicType.return,
            logicType.update,
        ]

        return (
            <div>
                {logicMenu.map(this._renderItem)}
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._addItemBelow}>
                    <i className={`drop-down-menu-icon ion-ios-bulb`}></i>
                    Add Logic Below
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className={`drop-down-menu-icon ion-md-close`}></i>
                    Delete
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePage,
        showDropdownByKey,
        addItemBelowOf,
        deleteItem,
    }
)(PickOperator)