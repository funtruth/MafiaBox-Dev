import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import { dropdownType } from '../types'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

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
        }
        this.fuse = new Fuse(_.toArray(props.pageRepo), OPTIONS)
    }

    _onMouseEnter = (key, e) => {
        const { dropdownParams } = this.props
        const { pageX, pageY, deepKey, deepestKey } = dropdownParams

        this.props.showDropdownByKey(dropdownType.showDeepLibrary, {
            deepKey: key,
            deepestKey: key === deepKey ? deepestKey : null,
            deepPageX: pageX + 158,
            deepPageY: e.pageY - (e.pageY - pageY - 8) % 28 - 8,
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
        const { searchText } = this.state

        let menuStyle = {
            top: pageY,
            left: pageX,
        }
        const boards = _.groupBy(pageRepo, i => i.boardType)
        console.log(boards)
        
        return (
            <div className="drop-down-menu" style={menuStyle}>
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