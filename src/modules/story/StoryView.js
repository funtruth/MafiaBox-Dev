import React from 'react'
import { boardType } from '../page/defaults'
import StoryBoard from '../board/StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.roles}/>
        )
    }
}

export default StoryView