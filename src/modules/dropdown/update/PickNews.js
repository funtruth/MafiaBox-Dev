import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

class PickNews extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        const selected = typeof currentValue === 'string' && currentValue === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                }}
            >
                <i
                    className={`${item.icon} drop-down-menu-icon`}
                />
                {item.title}
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

    _select = () => {
        const { pageKey, fieldKey, pageRepo } = this.props
        
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])
        
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
        return (
            <div>
                {[].map(this._renderItem)}
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
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePage,
        showDropdownByKey,
        addItemBelowOf,
        deleteItem,
    }
)(PickNews)