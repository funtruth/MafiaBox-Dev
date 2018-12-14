import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

class DeepLibraryMenu extends React.Component{
    _onMouseEnter = (key, disabled, e) => {
        const { dropdownParams } = this.props
        const { deepPageX, deepPageY } = dropdownParams

        this.props.showDropdownByKey(dropdownType.showDeepestLibrary, {
            deepestKey: key,
            deepestPageX: deepPageX + 158,
            deepestPageY: e.pageY - (e.pageY - deepPageY - 8) % 28 - 8,
        })
    }

    _onClick = (newValue) => {

        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams

        let valueClone = Array.from(pageRepo[pageKey][fieldKey])
        valueClone[indexKey][subfieldKey] = newValue

        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { pageMap } = this.props
        
        const items = pageMap[item.key] || []
        const showMore = items.length > 0
        const disabled = !showMore

        let itemStyle
        if (!showMore) {
            itemStyle = {
                color: '#767676',
            }
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onMouseOver={this._onMouseEnter.bind(this, item.key, disabled)}
                style={itemStyle}
            >
                {item.title || 'Untitled'}
                {showMore && <i
                    className="ion-ios-play"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    render() {
        const { dropdownParams, storyMap } = this.props
        const { deepPageX, deepPageY, deepKey } = dropdownParams

        const items = _.filter(storyMap, i => i.boardType === deepKey)
        if (!items || !items.length) return null

        let menuStyle = {
            top: deepPageY,
            left: deepPageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {items.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        storyMap: state.page.storyMap,
        pageMap: state.page.pageMap,
    }),
    {
        showDropdownByKey,
        updatePage,
    }
)(DeepLibraryMenu)