import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGridItem from './RoleGridItem';

export default SortableContainer((props) => {
    const { items, title } = props

    return (
        <div className="role-grid">
            <div className="role-grid-header">
                <div className="role-grid-title">{title}</div>
            </div>
            {items.map((pageKey, index) => {
                return (
                    <RoleGridItem
                        key={pageKey}
                        pageKey={pageKey}
                        index={index}
                    />
                )
            })}
        </div>
    )
})