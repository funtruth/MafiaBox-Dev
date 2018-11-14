import React from 'react'
import { boardType } from '../types'
import StoryBoard from '../StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.roles}/>
        )
    }
}

export default StoryView