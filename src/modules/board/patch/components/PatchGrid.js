import React from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import RoleGrid from '../../roles/RoleGrid';
import ModeGrid from '../../modes/ModeGrid';
import PatchHeader from './PatchHeader';
import RoleHeader from '../../roles/components/RoleHeader'
import ModeHeader from '../../modes/components/ModeHeader';
import {
    Row, Body,
} from '../../../components/Common';

export default SortableContainer((props) => {
    const { items } = props

    return (
        <div>
            {items.map((storyKey, index) => {
                return (
                    <div key={`item-${storyKey}`}>
                        <PatchHeader storyKey={storyKey}/>
                        <Row style={{flex:1}}>
                            <Body align="s" style={{flex: 0.6}}>
                                <RoleHeader storyKey={storyKey}/>
                                <RoleGrid
                                    storyKey={storyKey}
                                    index={index}
                                    axis="xy"
                                    transitionDuration={500}
                                    distance={2}
                                />
                            </Body>
                            <Body align="s" style={{flex: 0.4}}>
                                <ModeHeader storyKey={storyKey}/>
                                <ModeGrid
                                    storyKey={storyKey}
                                    index={index}
                                    axis="xy"
                                    transitionDuration={500}
                                    distance={2}
                                />
                            </Body>
                        </Row>
                    </div>
                )
            })}
        </div>
    )
})