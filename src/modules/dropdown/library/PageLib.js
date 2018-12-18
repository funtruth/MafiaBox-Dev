import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updatePageByPath } from '../../page/PageReducer'
import { showDropdownByKey } from '../DropdownReducer'

class PageLib extends React.Component{
    _onClick = (item) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, onSelect } = dropdownParams
        
        if (onSelect) return onSelect(item.pageKey)

        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', item.pageKey)
        this.props.showDropdownByKey()
    }

    render() {
        const { pageRepo, dropdownParams } = this.props
        const { hoverKey } = dropdownParams
        
        const pages = _.filter(pageRepo, i => i.storyType === hoverKey)

        return (
            pages.map((item, index) => {
                return (
                    <div
                        key={item.pageKey}
                        className="drop-down-menu-option"
                        onClick={this._onClick.bind(this, item)}
                    >
                        {pageRepo[item.pageKey].title}
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(PageLib)