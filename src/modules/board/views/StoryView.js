import React from 'react'
import { boardType } from '../../fields/defaults'
import StoryBoard from '../StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.roles.key}/>
        )
    }
}

export default StoryView