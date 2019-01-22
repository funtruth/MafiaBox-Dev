import React from 'react'
import { boardType } from '../../fields/defaults'
import StoryBoard from '../StoryBoard'

class FlowView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.phases.key}/>
        )
    }
}

export default FlowView