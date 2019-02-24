import React, { useState } from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType } from '../types'

import StoryMapLib from '../library/StoryMapLib';
import DropTitle from '../components/DropTitle';

function SearchBoard(props) {
    let [searchText, setSearchText] = useState('')
    let [results, setResults] = useState([])

    let fuse = new Fuse(_.filter(props.pageRepo, i => i.boardType === props.boardType), fuseType.searchBoard)

    let handleType = e => {
        setSearchText(e.target.value)
        setResults(fuse.search(e.target.value))
    }

    let handleSelect = (item) => {
        console.log({props})
    }
    
    const { pageRepo, boardType } = props
        
    return (
        <div>
            <input
                className="tag-input"
                value={searchText}
                onChange={handleType}
                placeholder="Search for page"
                type='text'
                autoFocus
                style={{ marginBottom: 8 }}
            />
            {searchText ?
                <div>
                    <DropTitle>results</DropTitle>
                    {results.length ?
                        results.map((item, index) => {
                            return (
                                <div
                                    key={item.pageKey}
                                    className="drop-down-menu-option"
                                    onClick={() => handleSelect(item)}
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
                    {...props}
                    hoverKey={boardType}
                />
            }
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(SearchBoard)