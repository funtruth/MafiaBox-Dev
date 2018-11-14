import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

import { boardType } from '../../../page/defaults'
import { dropdownType } from '../types'

class PhaseMenu extends React.Component{
    constructor(props) {
        super(props)
        this.timer = null
    }

    _onMouseEnter = (key, e) => {
        console.log(e)
        this.props.showDropdownByKey(dropdownType.showMorePhases, {
            deepKey: key,
        })
    }

    _renderItem = (item) => {
        if (item.boardType !== boardType.flow) return null

        const { pageMap } = this.props
        const showMore = pageMap[item.key] && pageMap[item.key].length
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
                onMouseOver={this._onMouseEnter.bind(this, item.key)}
                style={itemStyle}
            >
                {item.title}
                {showMore && <i
                    className="ion-ios-play"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    render() {
        const { dropdownParams, storyMap } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {storyMap.map(this._renderItem)}
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
)(PhaseMenu)