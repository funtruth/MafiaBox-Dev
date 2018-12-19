import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey } from '../DropdownReducer'

class StoryMapLib extends React.Component{
    _onMouseEnter = (key, e) => {
        this.props.showDropdownByKey(dropdownType.pageLib, e, {
            hoverKey: key,
            onSelect: this.props.onSelect
        })
    }

    render() {
        const { storyMap, pageRepo, hoverKey } = this.props
        
        let stories = _.filter(pageRepo, i => hoverKey === i.boardType)
        stories = _.groupBy(stories, i => i.storyType)
        
        return (
            Object.keys(stories).map((item, index) => {
                return (
                    <div
                        key={item}
                        className="drop-down-menu-option"
                        onMouseOver={this._onMouseEnter.bind(this, item)}
                    >
                        {storyMap[item].title}
                        <i
                            className="ion-ios-play"
                            style={{
                                marginLeft: 'auto',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey
    }
)(StoryMapLib)