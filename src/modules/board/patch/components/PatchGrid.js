import React, { useState } from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import PatchHeader from './PatchHeader';
import RoleHeader from '../../roles/components/RoleHeader'
import RoleGrid from '../../roles/RoleGrid';
import ModeHeader from '../../modes/components/ModeHeader';
import ModeGrid from '../../modes/ModeGrid';
import {
    Body,
} from '../../../components/Common';

export default SortableContainer((props) => {
    const { items } = props

    const [tab, setTab] = useState(0)

    return (
        <div>
            {items.map((storyKey, index) => (
                <div key={`item-${storyKey}`}>
                    <PatchHeader
                        storyKey={storyKey}
                        tab={tab}
                        setTab={setTab}
                    />
                    {tab === 0 &&
                        <Body align="s">
                            <RoleGrid
                                storyKey={storyKey}
                                index={index}
                                axis="y"
                                distance={2}
                            />
                        </Body>
                    }
                    {tab === 1 && 
                        <Body align="s">
                            <ModeGrid
                                storyKey={storyKey}
                                index={index}
                                axis="xy"
                                transitionDuration={500}
                                distance={2}
                            />
                        </Body>
                    }
                </div>
            ))}
        </div>
    )
})