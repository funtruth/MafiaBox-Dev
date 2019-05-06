import React from 'react'
import './ModeGrid.css'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import ModeGridItem from './components/ModeGridItem';

export default connect(
    state => ({
        modeMap: state.page.modeMap,
    })
)(SortableContainer((props) => {
    const { storyKey, modeMap } = props
    const items = modeMap[storyKey] || []
    
    return (
        <div style={{padding: '10px 14px'}}>
            {items.map((modeKey, index) => {
                return (
                    <ModeGridItem
                        key={modeKey}
                        modeKey={modeKey}
                        index={index}
                    />
                )
            })}
        </div>
    )
}))