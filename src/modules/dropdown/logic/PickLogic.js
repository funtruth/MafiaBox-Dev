import React from 'react'
import _ from 'lodash'

import { logicType } from '../../logic/types'

import DropParent from '../components/DropParent'

class PickLogic extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = item.key === currentValue

        if (item.dropdown) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={item.dropdown}
                    params={{
                        logicType: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
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
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (item) => {
        let update = {}
        update.logicType = item.key

        switch(item.key) {
            case logicType.operator.key:
            case logicType.update.key:
            case logicType.return.key:
                update.data = {}
                break
            default:
                update.data = ''
        }
        
        this.props.updatePage(update)
        this.props.showDropdown()
    }

    render() {
        const data = _.orderBy(logicType, i => i.index)

        return (
            <div>
                {data.map(this._renderItem)}
                <div className="-sep"/>
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

export default PickLogic