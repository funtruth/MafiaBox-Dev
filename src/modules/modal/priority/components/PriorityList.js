import React from 'react'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc';

import PriorityRowAdd from './PriorityRowAdd'
import PriorityRoleDrop from './PriorityRoleDrop';
import PriorityRoleDrag from './PriorityRoleDrag';
import PriorityListOptions from './PriorityRowOptions'

const PriorityListHandle = SortableHandle((props) => <PriorityRowAdd {...props}/>)

const PriorityListItem = SortableElement((props) => {
    const { items, index, switched, pageKey, storyKey } = props

    return (
        <div key={index} className="priority-row">
            <PriorityListHandle/>
            <PriorityRoleDrop {...props} index={index}>
                {items.map((item, xIndex) => (
                    <PriorityRoleDrag
                        key={item.pageKey}
                        item={item}
                        storyKey={storyKey}
                        switched={switched}
                        pageKey={pageKey}
                        yIndex={index}
                        xIndex={xIndex}
                    />
                ))}
            </PriorityRoleDrop>
            <PriorityListOptions {...props} index={index}/>
        </div>
    )
})

export default SortableContainer((props) => {
    const { items } = props
    return (
        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
            {items.map((list, index) => (
                <PriorityListItem {...props} key={index} items={list} index={index}/>
            ))}
        </div>
    )
})
