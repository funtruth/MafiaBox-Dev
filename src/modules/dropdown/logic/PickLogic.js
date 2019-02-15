import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { logicType } from '../../logic/types'
import { dropdownType } from '../types'

import { addItem, deleteItem } from '../../fields/FieldReducer'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';

class PickLogic extends React.Component{
    _renderItem = (item) => {
        const { attach } = this.props
        const chosen = item.key === attach.logicType

        if (item.dropdown) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    chosen={chosen.toString()}
                    dropdownType={item.dropdown}
                    params={{
                        hoverKey: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
                    style={{
                        backgroundColor: chosen && item.color,
                    }}
                />
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                style={{
                    backgroundColor: chosen && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    _select = (item) => {
        let update = {}
        
        update.logicType = item.key
        update.operatorType = ''

        switch(item.key) {
            case logicType.update.key:
            case logicType.return.key:
                update.data = {}
                break
            case logicType.function.key:
                update.data = ''
                break
            default:
        }
        
        this.props.updatePage(update)
        this.props.showDropdown()
    }

    _addItem = (dir) => {
        const { pageKey, fieldKey, indexKey } = this.props
        this.props.addItem(pageKey, fieldKey, indexKey, dir)
        this.props.showDropdown()
    }

    _deleteItem = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        this.props.deleteItem(pageKey, fieldKey, indexKey)
        this.props.showDropdown()
    }

    render() {
        const { attach } = this.props
        const data = _.orderBy(logicType, i => i.index)

        return (
            <div>
                <DropTitle>logic types</DropTitle>
                {data.map(this._renderItem)}
                <DropTitle>other options</DropTitle>
                <div className="drop-down-menu-option" onClick={this._addItem.bind(this, 'right')}>
                    <i className="drop-down-menu-icon mdi mdi-chevron-double-right"></i>
                    add right
                </div>
                <div className="drop-down-menu-option" onClick={this._addItem.bind(this, 'down')}>
                    <i className="drop-down-menu-icon mdi mdi-chevron-double-down"></i>
                    add below
                </div>
                {attach.source && <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className="drop-down-menu-icon mdi mdi-close"></i>
                    delete
                </div>}
                {attach.source && <DropParent
                    {...this.props}
                    dropdownType={dropdownType.pickDeleteMode}
                    icon="mdi mdi-close-network"
                    text="delete ..."
                />}
            </div>
        )
    }
}

export default connect(
    null,
    {
        addItem,
        deleteItem,
    }
)(PickLogic)