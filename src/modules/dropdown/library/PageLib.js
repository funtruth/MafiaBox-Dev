import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { panelType, updateViewType } from '../../logic/types'
import DropTitle from '../components/DropTitle';
import { VAR_DEFAULTS } from '../types';

class PageLib extends React.Component{
    _onClick = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            value: item.pageKey,
            panelType: panelType.page.key,
            updateViewType: updateViewType.page,
        })
        this.props.showDropdown()
    }

    render() {
        const { pageRepo, hoverKey } = this.props
        
        const pages = _.filter(pageRepo, i => i.storyType === hoverKey)

        return (
            <div>
                <DropTitle>page</DropTitle>
                {pages.map((item, index) => {
                    console.log({item})
                    return (
                        <div
                            key={item.pageKey}
                            className="drop-down-menu-option"
                            onClick={this._onClick.bind(this, item)}
                        >
                            {pageRepo[item.pageKey].title || 'Untitled'}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(PageLib)