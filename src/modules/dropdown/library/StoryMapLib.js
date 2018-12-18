import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey } from '../DropdownReducer'

class StoryMapLib extends React.Component{
    _onMouseEnter = (key, e) => {
        const { dropdownParams, searchMenu } = this.props
        const { pageX, pageY } = dropdownParams
        //TODO better alg cause sometimes buggy

        this.props.showDropdownByKey(dropdownType.pageLib, {
            ...dropdownParams,
            pageX: pageX + (searchMenu?208:158),
            pageY: e.pageY - (e.pageY - pageY - (searchMenu?60:8)) % 28 - 8,
            hoverKey: key,
            onSelect: this.props.onSelect
        })
    }

    render() {
        const { storyMap, pageRepo, dropdownParams, hoverKey } = this.props
        
        let stories = _.filter(pageRepo, i => (hoverKey || dropdownParams.hoverKey) === i.boardType)
        stories = _.groupBy(stories, i => i.storyType)
        
        return (
            <div>
                {Object.keys(stories).map((item, index) => {
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
                                }}
                            />
                        </div>
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
    {
        showDropdownByKey
    }
)(StoryMapLib)