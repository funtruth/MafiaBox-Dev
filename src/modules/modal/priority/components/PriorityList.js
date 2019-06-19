import React from 'react'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc';

import PriorityRowAdd from './PriorityRowAdd'
import PriorityRoleDrop from './PriorityRoleDrop';
import PriorityRoleDrag from './PriorityRoleDrag';
import PriorityRowOptions from './PriorityRowOptions'

const PriorityListHandle = SortableHandle((props) => <PriorityRowAdd {...props}/>)
const PriorityListSpace = SortableHandle(() => <div className="priority-row-space"></div>)

const PriorityListItem = SortableElement((props) => {
    const { items, index, switched, pageKey, storyKey } = props
    //TODO move the switch logic into here, so we can show a component that says ...+5 other roles
    return (
        <div style={{zIndex: 2}}>
            <PriorityRoleDrop {...props} index={index}>
                <PriorityListHandle/>
                <div className="row">
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
                </div>
                <PriorityRowOptions {...props} index={index}/>
                <PriorityListSpace/>
            </PriorityRoleDrop>
        </div>
    )
})

export default SortableContainer((props) => {
    const { groupedRoles } = props
    return (
        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
            {Object.keys(groupedRoles).map((priority, index) => (
                <PriorityListItem {...props} key={index} items={groupedRoles[priority]} index={index}/>
            ))}
        </div>
    )
})
