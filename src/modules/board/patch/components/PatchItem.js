import React from 'react'

import { dropdownType } from '../../../dropdown/types'

export default function PatchItem(props) {
    const { patchInfo } = props
    const { key: storyKey, boardType, title } = patchInfo

    const handleClick = () => {
        props.onClick(storyKey)
    }

    return (
        <div
            className="patch-item"
            onClick={handleClick}
        >
            <div className="patch-item-title">
                {title || 'Untitled'}
            </div>
            <div className="patch-item-footer">
                <div
                    className="patch-item-option app-onclick"
                    menu-type={dropdownType.storyShowMore}
                    app-onclick-props={JSON.stringify({
                        boardType,
                        mapKey: storyKey,
                    })}
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </div>
            </div>
        </div>
    )
}