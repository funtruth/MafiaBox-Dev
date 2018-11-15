import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

import { logicType, logicTypeInfo } from '../../../fields/logic/types'

class LogicMenu extends React.Component{
    _renderItem = (item) => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        const selected = pageRepo[pageKey] 
            && pageRepo[pageKey][fieldKey] 
            && pageRepo[pageKey][fieldKey][indexKey]
            && item === pageRepo[pageKey][fieldKey][indexKey].logicType

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
            >
                {logicTypeInfo[item].title}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    _select = (newValue) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams

        let valueClone = Array.from(pageRepo[pageKey][fieldKey])
        valueClone[indexKey].logicType = newValue
        
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        let logicMenu = [logicType.if, logicType.else, logicType.elseif, logicType.return]

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {logicMenu.map(this._renderItem)}
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
    }
)(LogicMenu)