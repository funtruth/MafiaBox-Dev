import React from 'react'
import { boardType } from '../page/defaults'
import StoryBoard from '../board/StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <div className="story-view">
                <StoryBoard boardType={boardType.roles}/>
            </div>
        )
    }
}

export default StoryView