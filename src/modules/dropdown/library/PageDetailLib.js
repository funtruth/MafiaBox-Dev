import React from 'react'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

//@param pageKey -> to browse pageMap for pageKey's
export default function PageDetailLib(props) {
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