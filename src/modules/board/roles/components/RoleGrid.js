import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import {
    Row,
} from '../../../components/Common';

import RoleGridItem from './RoleGridItem';

export default connect(
    state => ({
        pageMap: state.page.pageMap,
        storyRepo: state.page.storyRepo,
    })
)(SortableContainer((props) => {
    const { storyKey, pageMap, storyRepo } = props
    const items = pageMap[storyKey] || []
    
    return (
        <div>
            <Row bg="blackish" color="whitish" size="s">
                {storyRepo[storyKey].title || 'Untitled'}
            </Row>
            <Row size="s">
                {items.map((pageKey, index) => {
                    return (
                        <RoleGridItem
                            key={pageKey}
                            pageKey={pageKey}
                            index={index}
                        />
                    )
                })}
            </Row>
            
        </div>
    )
}))