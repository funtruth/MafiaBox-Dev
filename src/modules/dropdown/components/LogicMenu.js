import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

import { logicType, logicTypeInfo } from '../../logic/types'

class LogicMenu extends React.Component{
    _renderItem = (item) => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        const selected = pageRepo[pageKey] 
            && pageRepo[pageKey][fieldKey] 
            && pageRepo[pageKey][fieldKey][indexKey]
            && item === pageRepo[pageKey][fieldKey][indexKey].logicType

        let itemStyle = {}
        selected && (itemStyle = {
            backgroundColor: selected ? logicTypeInfo[item].color : null,
            color: selected ? '#fff' : '#b6b6b6',
        })

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={itemStyle}
            >
                <i
                    className={`${logicTypeInfo[item].icon} drop-down-menu-icon`}
                />
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
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])

        valueClone[indexKey].logicType = newValue
        
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    _addItemBelow = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.addItemBelowOf(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    _deleteItem = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

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
            <div className="drop-down-menu" style={menuStyle}>
                {logicMenu.map(this._renderItem)}
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._addItemBelow}>
                    <i className={`drop-down-menu-icon ion-ios-bulb`}></i>
                    Add Logic
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
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        updatePage,
        showDropdownByKey,
        addItemBelowOf,
        deleteItem,
    }
)(LogicMenu)