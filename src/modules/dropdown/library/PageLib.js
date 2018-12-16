import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updatePageByPath } from '../../page/PageReducer'
import { showDropdownByKey } from '../DropdownReducer'

class PageLib extends React.Component{
    _onClick = (item) => {
        this.props.onSelect(item.pageKey)
    }

    render() {
        const { pageRepo, hoverKey } = this.props
        
        let pages = _.filter(pageRepo, i => i.storyType === hoverKey)

        return (
            <div>
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