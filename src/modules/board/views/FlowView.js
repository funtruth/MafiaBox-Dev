import React from 'react'
import { boardType } from '../../page/defaults'
import StoryBoard from '../StoryBoard'

class FlowView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.flow}/>
        )
    }
}

export default FlowView