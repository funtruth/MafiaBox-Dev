import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

const HIDE_MENU = 'hide-menu'

class LibraryMenu extends React.Component{
    _onMouseEnter = (key, e) => {
        const { dropdownParams } = this.props
        const { pageX, pageY, deepKey, deepestKey } = dropdownParams

        this.props.showDropdownByKey(dropdownType.showDeepLibrary, {
            deepKey: key,
            deepestKey: key === deepKey ? deepestKey : null,
            deepPageX: pageX + 158,
            deepPageY: e.pageY - (e.pageY - pageY - 8) % 28 - 8,
        })
    }

    _renderItem = (item) => {
        const { boardRepo, storyMap } = this.props

        const items = _.filter(storyMap, i => i.boardType === item)
        const showMore = items.length > 0

        let itemStyle
        if (!showMore) {
            itemStyle = {
                color: '#767676',
            }
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onMouseOver={this._onMouseEnter.bind(this, item)}
                style={itemStyle}
            >
                {boardRepo[item].title}
                {showMore && <i
                    className="ion-ios-play"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    render() {
        const { dropdownParams, boardOrder } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                <div
                    className="drop-down-menu-option"
                    onClick={this._addItemBelow}
                    onMouseOver={this._onMouseEnter.bind(this, HIDE_MENU)}
                >
                    <i className={`drop-down-menu-icon mdi mdi-variable`}></i>
                    Variable
                </div>
                <div
                    className="drop-down-menu-option"
                    onClick={this._addItemBelow}
                    onMouseOver={this._onMouseEnter.bind(this, HIDE_MENU)}
                >
                    <i className={`drop-down-menu-icon mdi mdi-code-braces`}></i>
                    Object
                </div>
                <div className="drop-down-menu-separator"/>
                {boardOrder.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        boardOrder: state.board.boardOrder,
        boardRepo: state.board.boardRepo,
        storyMap: state.page.storyMap,
    }),
    {
        showDropdownByKey,
        popHighestDropdown,
        updatePage,
    }
)(LibraryMenu)