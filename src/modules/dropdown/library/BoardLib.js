import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType, dropdownType } from '../types'

import { showDropdownByKey, popDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class BoardLib extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
        }
        this.fuse = new Fuse(_.toArray(props.pageRepo), fuseType.searchBoard)
    }

    _onSelect = (key) => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', key)
        this.props.showDropdownByKey()
    }

    _onMouseEnter = (key, e) => {
        const { hoverKey } = this.props
        if (key === hoverKey) return
        this.props.showDropdownByKey(dropdownType.storyMapLib, e, {
            hoverKey: key,
        })
    }

    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    render() {
        const { pageRepo, boardRepo } = this.props
        const { searchText } = this.state

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
                                        pointerEvents: 'none',
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
        boardRepo: state.page.boardRepo,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey,
        popDropdown,
        updatePageByPath,
    }
)(BoardLib)