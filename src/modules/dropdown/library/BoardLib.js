import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType, dropdownType } from '../types'

import DropParent from '../components/DropParent'

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
        this.props.updatePage(key)
        this.props.showDropdown()
    }

    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    render() {
        const { pageRepo } = this.props
        const { searchText } = this.state

        const boards = _(pageRepo)
            .filter(i => i && i.boardType)
            .groupBy(i => i.boardType)
            .value()
        
        return (
            <div>
                <input
                    className="tag-input"
                    value={this.state.searchText}
                    onChange={this._onType}
                    placeholder="Search for page"
                    type='text'
                    autoFocus
                />
                <div className="-sep"/>
                {searchText ?
                    this.state.results.length ?
                        this.state.results.map((item, index) => {
                            return (
                                <div
                                    key={item.pageKey}
                                    className="drop-down-menu-option"
                                    onClick={this._onSelect.bind(this, item)}
                                >
                                    <div className="text-ellipsis" style={{ maxWidth: 100 }}>
                                        {item.title}
                                    </div>
                                    <div style={{ marginLeft: 'auto', color: '#666666' }}>
                                        {item.boardType}
                                    </div>
                                </div>
                            )
                        })
                        :<div className="drop-down-menu-option" empty="true">
                            No search results found
                        </div>
                    :Object.keys(boards).map((item, index) => {
                        return (
                            <DropParent
                                key={item}
                                dropdown={dropdownType.storyMapLib}
                                params={{
                                    hoverKey: item,
                                }}
                                text={item}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(BoardLib)