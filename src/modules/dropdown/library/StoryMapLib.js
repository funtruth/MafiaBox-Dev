import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PageLib from './PageLib'

class StoryMapLib extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            nextPageX: 0,
            nextPageY: 0,
            nextHoverKey: null,
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hoverKey !== this.props.hoverKey) {
            this.setState({
                showDropdown: false
            })
        }
    }

    _onMouseEnter = (key, e) => {
        const { pageX, pageY } = this.props
        
        this.setState({
            showDropdown: true,
            nextPageX: pageX + 158,
            nextPageY: e.pageY - (e.pageY - pageY - 8) % 28 - 8,
            nextHoverKey: key,
        })
    }

    render() {
        const { storyMap, pageRepo, pageX, pageY, hoverKey } = this.props
        const { showDropdown, nextPageX, nextPageY, nextHoverKey } = this.state
        
        let stories = _.filter(pageRepo, i => hoverKey === i.boardType)
        stories = _.groupBy(stories, i => i.storyType)

        return (
            <div className="drop-down-menu" style={{ top: pageY, left: pageX }}>
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
                {showDropdown && <PageLib pageX={nextPageX} pageY={nextPageY} hoverKey={nextHoverKey}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    })
)(StoryMapLib)