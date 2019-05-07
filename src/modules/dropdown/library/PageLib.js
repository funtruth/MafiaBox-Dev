import React from 'react'
import { connect } from 'react-redux'

import {
    updateType,
} from '../../common/types'
import {
    VAR_DEFAULTS,
} from '../../common/defaults'

import DropTitle from '../components/DropTitle';

//@param storyKey -> to browse pageMap for pageKey's
function PageLib(props) {
    const { pageRepo, pageMap, storyKey } = props
    const pages = pageMap[storyKey] || []

    const handleClick = (pageKey) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: pageKey,
            display: pageRepo[pageKey].title,
            updateType: updateType.page,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>pages</DropTitle>
            {pages.map((pageKey) => (
                <div
                    key={pageKey}
                    className="drop-down-menu-option"
                    onClick={() => handleClick(pageKey)}
                >
                    {(pageRepo[pageKey] && pageRepo[pageKey].title) || 'Untitled'}
                </div>
            ))}
        </>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        pageMap: state.page.pageMap,
    }),
)(PageLib)