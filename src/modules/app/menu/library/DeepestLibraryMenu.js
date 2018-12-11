import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

class DeepestLibraryMenu extends React.Component{
    _onClick = (newValue) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams

        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])
        valueClone[indexKey].pageKey = newValue

        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { pageRepo } = this.props

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._onClick.bind(this, item)}
            >
                {pageRepo[item].title || 'Untitled'}
            </div>
        )
    }

    render() {
        const { dropdownParams, pageMap } = this.props
        const { deepestPageX, deepestPageY, deepestKey } = dropdownParams

        const data = pageMap[deepestKey]
        if (!data) return null

        let menuStyle = {
            top: deepestPageY,
            left: deepestPageX,
        }
        
        return (
            <div className="drop-down-menu" style={menuStyle}>
                {data.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        pageMap: state.page.pageMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey,
        updatePage,
    }
)(DeepestLibraryMenu)