import React from 'react'
import './RoleGrid.css'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGridItem from './components/RoleGridItem';

export default SortableContainer(({items}) => (
    <div>
        {items.map((pageKey, index) => (
            <RoleGridItem
                key={pageKey}
                pageKey={pageKey}
                index={index}
            />
        ))}
    </div>
))