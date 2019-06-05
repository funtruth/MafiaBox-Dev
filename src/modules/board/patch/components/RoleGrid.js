import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGridItem from './RoleGridItem';

export default SortableContainer(({items, board}) => (
    <div>
        {items.map((pageKey, index) => (
            <RoleGridItem
                key={pageKey}
                pageKey={pageKey}
                board={board}
                index={index}
            />
        ))}
    </div>
))