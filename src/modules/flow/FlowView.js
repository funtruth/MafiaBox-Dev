import React from 'react'
import './flow.css'
import { boardType } from '../page/defaults'
import StoryBoard from '../board/StoryBoard'

class FlowView extends React.Component{
    render() {
        return (
            <div className="story-view">
                <StoryBoard boardType={boardType.flow}/>
            </div>
        )
    }
}

export default FlowView