import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import PatchItem from './components/PatchItem';

export default function PatchView({match}) {
    const storyMap = useSelector(state => state.page.storyMap)

    const { board } = match.params

    const items = _.toArray(storyMap).slice().reverse()

    return (
        <div className="story-view" style={{flexDirection: "column"}}>
            {items.map(storyKey => (
                <PatchItem
                    key={storyKey}
                    board={board}
                    storyKey={storyKey}
                />
            ))}
        </div>
    )
}