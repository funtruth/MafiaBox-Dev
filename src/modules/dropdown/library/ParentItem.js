import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import NestedDropdown from './NestedDropdown';

class ParentItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            childInfo: {},
        }
    }

    _onMouseEnter = (key, e) => {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        this.setState({
            showDropdown: true,
            childInfo: {
                key,
                pageX: pageX + 158,
                pageY: e.pageY - (e.pageY - pageY - 8) % 28 - 8,
            }
        })
    }

    render() {
        const { item } = this.props
        const { showDropdown, childInfo } = this.state

        const showMore = true
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
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
    })
)(ParentItem)