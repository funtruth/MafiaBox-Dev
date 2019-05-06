import React from 'react'
import './ModeGrid.css'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import ModeGridItem from './components/ModeGridItem';
import Body from '../../components/Body';

export default connect(
    state => ({
        pageMap: state.page.pageMap,
    })
)(SortableContainer((props) => {
    const { storyKey, pageMap } = props
    const items = pageMap[storyKey] || []
    
    return (
        <div style={{padding: '10px 14px'}}>
            {items.map((pageKey, index) => {
                return (
                    <ModeGridItem
                        key={pageKey}
                        pageKey={pageKey}
                        index={index}
                    />
                )
            })}
        </div>
    )
}))