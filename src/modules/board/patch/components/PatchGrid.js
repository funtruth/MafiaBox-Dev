import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGrid from '../../roles/components/RoleGrid';

export default SortableContainer((props) => {
    const { items } = props

    return (
        <div>
            {items.map((storyKey, index) => (
                <RoleGrid
                    key={`item-${storyKey}`}
                    storyKey={storyKey}
                    index={index}
                    axis="xy"
                    transitionDuration={500}
                    distance={2}
                />
            ))}
        </div>
    )
})