import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';
import RoleGridItem from './RoleGridItem';

const RoleGrid = SortableContainer((props) => {
    const { items } = props
    
    return (
        <div className="role-grid">
            <div className="role-grid-title">{props.title}</div>
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

export default RoleGrid