import React from 'react'
import './story.css'

import StoryBoard from './components/StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <div className="story-view">
                <StoryBoard/>
            </div>
        )
    }
}

export default StoryView