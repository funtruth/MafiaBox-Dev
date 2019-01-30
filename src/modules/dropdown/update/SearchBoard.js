import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType } from '../types'

import StoryMapLib from '../library/StoryMapLib';
import DropTitle from '../components/DropTitle';

class SearchBoard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
        }
        this.fuse = new Fuse(_.filter(props.pageRepo, i => i.boardType === props.boardType), fuseType.searchBoard)
    }

    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    render() {
        const { pageRepo, boardType } = this.props
        const { searchText } = this.state
        
        return (
            <div>
                <input
                    className="tag-input"
                    value={this.state.searchText}
                    onChange={this._onType}
                    placeholder="Search for page"
                    type='text'
                    autoFocus
                    style={{ marginBottom: 8 }}
                />
                {searchText ?
                    <div>
                        <DropTitle>results</DropTitle>
                        {this.state.results.length ?
                            this.state.results.map((item, index) => {
                                return (
                                    <div
                                        key={item.pageKey}
                                        className="drop-down-menu-option"
                                        onClick={this._onSelect.bind(this, item)}
                                    >
                                        <div className="text-ellipsis" style={{ maxWidth: 100 }}>{pageRepo[item.pageKey].title}</div>
                                        <div style={{ marginLeft: 'auto', color: '#666666' }}>
                                            {item.boardType}
                                        </div>
                                    </div>
                                )
                            })
                            :<div className="drop-down-menu-option" empty="true">
                                No search results found
                            </div>
                        }
                    </div>
                    :<StoryMapLib
                        {...this.props}
                        hoverKey={boardType}
                    />
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(SearchBoard)