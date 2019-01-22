import React from 'react'
import { boardType } from '../../fields/defaults'
import StoryBoard from '../StoryBoard'

class LibraryView extends React.Component{
    render() {
        return (
            <StoryBoard boardType={boardType.library.key}/>
        )
    }
}

export default LibraryView