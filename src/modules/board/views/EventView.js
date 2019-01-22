import React from 'react'
import { boardType } from '../../fields/defaults'
import StoryBoard from '../StoryBoard'

class EventView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.events.key}/>
        )
    }
}

export default EventView