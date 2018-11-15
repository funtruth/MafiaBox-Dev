import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

import { refMenuList, pathToTitle } from '../../../navigation/paths'

class EverythingMenu extends React.Component{
    _renderItem = (item) => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams
        
        const selected = pageRepo[pageKey] 
            && pageRepo[pageKey][fieldKey] 
            && pageRepo[pageKey][fieldKey][indexKey]
            && item.key === pageRepo[pageKey][fieldKey][indexKey][subfieldKey]

        const showMore = true

        return (
            <div
                key={item}
                className="drop-down-menu-option"
            >
                {pathToTitle[item]}
                {showMore && <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    render() {
        const { dropdownParams, fieldRepo } = this.props
        const { fieldKey, pageX, pageY } = dropdownParams

        if (!fieldKey) return null
        const fieldInfo = fieldRepo[fieldKey]

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {refMenuList.data.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        fieldRepo: state.field.fieldRepo,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey,
        updatePage,
    }
)(EverythingMenu)