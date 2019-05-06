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
        <div>
            {items.map((modeKey, index) => (
                <ModeGridItem
                    key={modeKey}
                    modeKey={modeKey}
                    index={index}
                />
            ))}
        </div>
    )
}))