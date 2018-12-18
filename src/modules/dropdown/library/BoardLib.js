import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType } from '../types'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

import StoryMapLib from './StoryMapLib';
import Dropdown from '../components/Dropdown';

class BoardLib extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
            showDropdown: false,
            nextPageX: 0,
            nextPageY: 0,
            hoverKey: null,
        }
        this.fuse = new Fuse(_.toArray(props.pageRepo), fuseType.boardLib)
    }

    _onSelect = (key) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', key)
        this.props.showDropdownByKey()
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
            results: this.fuse.search(e.target.value),
            showDropdown: false,
        })
    }

    render() {
        const { pageRepo, boardRepo } = this.props
        const { searchText, showDropdown, nextPageX, nextPageY, hoverKey } = this.state

        const boards = _.groupBy(pageRepo, i => i.boardType)
        
        return (
            <div>
                <input
                    className="tag-input menu-voidclick"
                    value={this.state.searchText}
                    onChange={this._onType}
                    placeholder="Search for page"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
                {searchText ?
                    this.state.results.length ?
                        this.state.results.map((item, index) => {
                            return (
                                <div
                                    key={item.pageKey}
                                    className="drop-down-menu-option"
                                    onClick={this._onSelect.bind(this, item)}
                                >
                                    <div className="text-ellipsis" style={{ maxWidth: 100 }}>{pageRepo[item.pageKey].title}</div>
                                    <div style={{ marginLeft: 'auto', color: '#666666' }}>
                                        {`${boardRepo[item.boardType].title}`}
                                    </div>
                                </div>
                            )
                        })
                        :<div className="drop-down-menu-option" style={{ color: '#666666' }}>
                            No search results found
                        </div>
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
                {showDropdown && <Dropdown pageX={nextPageX} pageY={nextPageY}>
                    <StoryMapLib
                        pageX={nextPageX}
                        pageY={nextPageY}
                        hoverKey={hoverKey}
                        onSelect={this._onSelect}
                    />
                </Dropdown>}
            </div>
        )
    }
}

export default connect(
    state => ({
        boardRepo: state.page.boardRepo,
        pageRepo: state.page.pageRepo,
        storyMap: state.page.storyMap,
    }),
    {
        showDropdownByKey,
        popHighestDropdown,
        updatePageByPath,

    }
)(BoardLib)