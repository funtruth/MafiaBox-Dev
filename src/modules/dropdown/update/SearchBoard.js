import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType } from '../types'
import { valueType } from '../../logic/types'

import { popDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

import StoryMapLib from '../library/StoryMapLib';

class SearchBoard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
        }
        this.fuse = new Fuse(_.filter(props.pageRepo, i => i.boardType === props.boardType), fuseType.searchBoard)
    }

    _onSelect = (value) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        if (subfieldKey) {
            this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
                value,
                valueType: valueType.page,
            })
        } else {
            this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', value)
        }
            
        this.props.showDropdown()
    }

    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    render() {
        const { pageRepo, boardRepo, boardType } = this.props
        const { searchText } = this.state
        
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
                    :<StoryMapLib
                        {...this.props}
                        hoverKey={boardType}
                        onSelect={this._onSelect}
                    />
                }
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
        popDropdown,
        updatePageByPath,
    }
)(SearchBoard)