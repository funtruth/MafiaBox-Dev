import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

import { boardType } from '../../../board/types'
import { dropdownType } from '../types'

const menuKeys = [
    {
        title: 'Library',
        boardType: boardType.library,
    },
    {
        title: 'Roles',
        boardType: boardType.roles,
    },
    {
        title: 'Phases',
        boardType: boardType.flow,
    },
]

function sortLibrary(storyMap) {
    let keyedLibrary = {}
    for (var i=0; i<menuKeys.length; i++) {
        keyedLibrary[menuKeys[i].boardType] = []
    }
    for (var j=0; j<storyMap.length; j++) {
        if (keyedLibrary[storyMap[j].boardType]) {
            keyedLibrary[storyMap[j].boardType].push(storyMap[j].key)
        }
    }
    return keyedLibrary
}

class LibraryMenu extends React.Component{
    _onMouseEnter = (key, disabled, e) => {
        this.props.showDropdownByKey(dropdownType.showDeepLibrary, {
            deepKey: key,
        })
    }

    _renderItem = (item) => {
        const { pageMap } = this.props
        const showMore = pageMap[item] && pageMap[item].length
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
                {pageMap[item].title}
                {showMore && <i
                    className="ion-ios-play"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    render() {
        const { dropdownParams, keyedStoryMap } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {menuKeys.map((item, index) => (
                    keyedStoryMap[item.boardType].map(this._renderItem)
                ))}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        keyedStoryMap: sortLibrary(state.page.storyMap),

        pageMap: state.page.pageMap,
    }),
    {
        showDropdownByKey,
        popHighestDropdown,
        updatePage,
    }
)(LibraryMenu)