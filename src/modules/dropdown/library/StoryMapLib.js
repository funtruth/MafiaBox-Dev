import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PageLib from './PageLib'
import Dropdown from '../components/Dropdown';

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
        const { pageX, pageY, searchMenu } = this.props
        
        //TODO better alg cause sometimes buggy
        this.setState({
            showDropdown: true,
            nextPageX: pageX + (searchMenu?208:158),
            nextPageY: e.pageY - (e.pageY - pageY - (searchMenu?60:8)) % 28 - 8,
            nextHoverKey: key,
        })
    }

    render() {
        const { storyMap, pageRepo, hoverKey } = this.props
        const { showDropdown, nextPageX, nextPageY, nextHoverKey } = this.state
        
        let stories = _.filter(pageRepo, i => hoverKey === i.boardType)
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
                {showDropdown && <Dropdown pageX={nextPageX} pageY={nextPageY}>
                    <PageLib
                        pageX={nextPageX}
                        pageY={nextPageY}
                        hoverKey={nextHoverKey}
                        onSelect={this.props.onSelect}
                    />
                </Dropdown>}
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