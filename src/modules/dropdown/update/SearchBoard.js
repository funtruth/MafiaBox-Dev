import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType } from '../types'

import StoryMapLib from '../library/StoryMapLib';
import DropTitle from '../components/DropTitle';

function SearchBoard(props) {
    const { pageRepo, boardType } = props
    if (!boardType) return null;

    let [searchText, setSearchText] = useState('')
    let [results, setResults] = useState([])
    useEffect(() => {
        const fuse = new Fuse(_.filter(pageRepo, i => i && i.boardType === boardType), fuseType.searchBoard)
        setResults(fuse.search(searchText))
    }, [searchText, pageRepo])

    let handleType = e => setSearchText(e.target.value)

    let handleSelect = (item) => {
        console.log({props})
    }
    
    return (
        <>
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
        </>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(SearchBoard)