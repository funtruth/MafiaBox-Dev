import React from 'react'

import { panelType, updateViewType } from '../../logic/types'
import { VAR_DEFAULTS } from '../types';

import DropTitle from '../components/DropTitle';

//@param pageKey -> to browse pageMap for pageKey's
export default function PageDetailLib(props) {
    const { pageRepo, pageMap, storyKey } = props
    const pages = pageMap[storyKey] || []

    const handleClick = (pageKey) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: pageKey,
            panelType: panelType.page.key,
            updateViewType: updateViewType.page,
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