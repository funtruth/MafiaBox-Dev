import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle'

class StoryMapLib extends React.Component{
    render() {
        const { storyMap, pageRepo, hoverKey } = this.props
        
        const stories = _(pageRepo)
            .filter(i => hoverKey === i.boardType)
            .groupBy(i => i.storyType)
            .value()
        
        return (
            <div>
                <DropTitle>story</DropTitle>
                {Object.keys(stories).map((item, index) => {
                    return (
                        <DropParent
                            {...this.props}
                            key={item}
                            dropdownType={dropdownType.pageLib}
                            params={{
                                hoverKey: item,
                                onSelect: this.props.onSelect,
                            }}
                            text={storyMap[item].title}
                        />
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
)(StoryMapLib)