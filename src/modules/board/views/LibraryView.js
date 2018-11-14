import React from 'react'
import { boardType } from '../types'
import StoryBoard from '../StoryBoard'

class LibraryView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.events}/>
        )
    }
}

export default LibraryView