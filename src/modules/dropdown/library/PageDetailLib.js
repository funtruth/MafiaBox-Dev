import React from 'react'

import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import DropTitle from '../components/DropTitle';

//@param pageKey -> to browse pageMap for pageKey's
export default function PageDetailLib(props) {
    const { pageRepo, pageMap, storyKey } = props
    const pages = pageMap[storyKey] || []

    const handleClick = (pageKey) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            value: pageKey,
            display: pageRepo[pageKey].title,
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