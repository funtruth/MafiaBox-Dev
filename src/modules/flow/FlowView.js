import React from 'react'
import './flow.css'
import { boardType } from '../page/defaults'
import StoryBoard from '../board/StoryBoard'

class FlowView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.flow}/>
        )
    }
}

export default FlowView