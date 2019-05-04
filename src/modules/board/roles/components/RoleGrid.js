import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import {
    Row,
} from '../../../components/Common';

import PatchHeader from '../../patch/components/PatchHeader'
import RoleGridItem from './RoleGridItem';

export default connect(
    state => ({
        pageMap: state.page.pageMap,
    })
)(SortableContainer((props) => {
    const { storyKey, pageMap } = props
    const items = pageMap[storyKey] || []
    
    return (
        <div>
            <PatchHeader storyKey={storyKey}/>
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