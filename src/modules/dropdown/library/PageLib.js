import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { panelType } from '../../logic/types'

class PageLib extends React.Component{
    _onClick = (item) => {
        const { subfieldKey, onSelect } = this.props
        
        if (onSelect) return onSelect(item.pageKey)

        this.props.updatePage({
            [subfieldKey]: item.pageKey,
            [`${subfieldKey}Type`]: panelType.page.key,
        })
        this.props.showDropdown()
    }

    render() {
        const { pageRepo, hoverKey } = this.props
        
        const pages = _.filter(pageRepo, i => i.storyType === hoverKey)

        return (
            pages.map((item, index) => {
                return (
                    <div
                        key={item.pageKey}
                        className="drop-down-menu-option"
                        onClick={this._onClick.bind(this, item)}
                    >
                        {pageRepo[item.pageKey].title || 'Untitled'}
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(PageLib)