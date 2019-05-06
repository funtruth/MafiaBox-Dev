import React from 'react'
import './RoleGrid.css'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGridItem from './components/RoleGridItem';

export default connect(
    state => ({
        pageMap: state.page.pageMap,
    })
)(SortableContainer((props) => {
    const { storyKey, pageMap } = props
    const items = pageMap[storyKey] || []
    
    return (
        <div>
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
}))