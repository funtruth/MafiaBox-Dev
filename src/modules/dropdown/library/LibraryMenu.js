import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

import StoryMapLib from './StoryMapLib';

const OPTIONS = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "title"
    ],
}

class LibraryMenu extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            showDropdown: false,
            nextPageX: 0,
            nextPageY: 0,
            hoverKey: null,
        }
        this.fuse = new Fuse(_.toArray(props.pageRepo), OPTIONS)
    }

    _onMouseEnter = (key, e) => {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams
        if (key === this.state.hoverKey) return

        this.setState({
            showDropdown: true,
            nextPageX: pageX + 208,
            nextPageY: e.pageY - (e.pageY - pageY - 60) % 28 - 8,
            hoverKey: key,
        })
    }

    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value)
        })
    }

    render() {
        const { dropdownParams, pageRepo, boardRepo } = this.props
        const { pageX, pageY } = dropdownParams
        const { searchText, showDropdown, nextPageX, nextPageY, hoverKey } = this.state

        const boards = _.groupBy(pageRepo, i => i.boardType)
        
        return (
            <div className="drop-down-menu" style={{ top: pageY, left: pageX }}>
                <input
                    className="tag-input menu-voidclick"
                    value={this.state.searchText}
                    onChange={this._onType}
                    placeholder="Search for"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
                {searchText ? 
                    <div></div>
                    :Object.keys(boards).map((item, index) => {
                        return (
                            <div
                                key={item}
                                className="drop-down-menu-option"
                                onMouseOver={this._onMouseEnter.bind(this, item)}
                            >
                                {boardRepo[item].title}
                                <i
                                    className="ion-ios-play"
                                    style={{
                                        marginLeft: 'auto',
                                    }}
                                />
                            </div>
                        )
                    })
                }
                {showDropdown && <StoryMapLib pageX={nextPageX} pageY={nextPageY} hoverKey={hoverKey}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        boardRepo: state.page.boardRepo,
        pageRepo: state.page.pageRepo,
        storyMap: state.page.storyMap,
    }),
    {
        showDropdownByKey,
        popHighestDropdown,
        updatePage,
    }
)(LibraryMenu)