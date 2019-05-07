import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import ModeGridItem from './components/ModeGridItem';

export default SortableContainer(({items}) => (
    <div>
        {items.map((modeKey, index) => (
            <ModeGridItem
                key={modeKey}
                modeKey={modeKey}
                index={index}
            />
        ))}
    </div>
))