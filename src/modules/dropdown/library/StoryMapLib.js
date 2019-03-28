import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle'

//@param boardType -> to browse storyMap for storyKey's
function StoryMapLib(props) {
    const { storyMap, storyRepo, hoverKey } = props
    const stories = storyMap[hoverKey] || []
    
    return (
        <>
            <DropTitle>patches</DropTitle>
            {stories.map((item) => (
                <DropParent
                    {...props}
                    key={item}
                    dropdownType={dropdownType.pageLib}
                    params={{
                        storyKey: item,
                    }}
                    text={(storyRepo[item] && storyRepo[item].title) || 'Untitled'}
                />
            ))}
        </>
    )
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        storyRepo: state.page.storyRepo,
    }),
)(StoryMapLib)