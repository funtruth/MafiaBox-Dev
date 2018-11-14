import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

class DeepPhaseMenu extends React.Component{
    _renderItem = (item) => {
        const { pageRepo } = this.props

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._onClick.bind(this, item)}
            >
                {pageRepo[item].title}
            </div>
        )
    }

    _onClick = (newValue) => {

        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams

        let valueClone = Array.from(pageRepo[pageKey][fieldKey])
        valueClone[indexKey][subfieldKey] = newValue

        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams, pageMap } = this.props
        const { pageX, pageY, deepKey } = dropdownParams

        const data = pageMap[deepKey]
        if (!data) return null

        let menuStyle = {
            top: pageY,
            left: pageX + 158,
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
)(DeepPhaseMenu)