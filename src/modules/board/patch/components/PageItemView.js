import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import PageItem from './PageItem';

export default SortableContainer(({items, board}) => (
    <div>
        {items.map((pageKey, index) => (
            <PageItem
                key={pageKey}
                pageKey={pageKey}
                board={board}
                index={index}
            />
        ))}
    </div>
))