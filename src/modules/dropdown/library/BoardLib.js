import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { fuseType, dropdownType } from '../types'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class BoardLib extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
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
        const { pageX, pageY, hoverKey } = dropdownParams
        if (key === hoverKey) return

        this.props.showDropdownByKey(dropdownType.storyMapLib, {
            ...dropdownParams,
            pageX: pageX + e.target.offsetWidth,
            pageY: e.pageY - (e.pageY - pageY - e.target.offsetTop) % e.target.offsetHeight - 8,
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
        popHighestDropdown,
        updatePageByPath,
    }
)(BoardLib)