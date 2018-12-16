import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updatePageByPath } from '../../page/PageReducer'
import { showDropdownByKey } from '../DropdownReducer'

class PageLib extends React.Component{
    _onClick = (item) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams

        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', item.pageKey)
        this.props.showDropdownByKey()
    }

    render() {
        const { pageRepo, pageX, pageY, hoverKey } = this.props
        
        let pages = _.filter(pageRepo, i => i.storyType === hoverKey)

        return (
            <div className="drop-down-menu" style={{ top: pageY, left: pageX }}>
                {pages.map((item, index) => {
                    return (
                        <div
                            key={item}
                            className="drop-down-menu-option"
                            onClick={this._onClick.bind(this, item)}
                        >
                            {pageRepo[item.pageKey].title}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(PageLib)