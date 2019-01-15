import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { screenType } from '../types'
import { fuseType } from '../../dropdown/types'

class StringDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
        }
        this.fuse = new Fuse(_.toArray(props.stringRepo), fuseType.stringDashboard)
    }
    
    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    _onCreate = () => {
        this.props.navigate(screenType.edit)
    }

    _renderItem = (item) => {
        return (
            <div
                key={item.key}
                className="dashboard-item"
            >
                {item.string}
            </div>
        )
    }

    render() {
        const { results } = this.state

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    height: '100%',
                }}
            >
                <input
                    className="tag-input"
                    value={this.state.searchText}
                    onChange={this._onType}
                    placeholder="Search for string"
                    type='text'
                    autoFocus
                    style={{
                        marginTop: 12,
                        width: '30%',
                        alignSelf: 'center',
                    }}
                />
                <div className="drop-down-menu-separator"/>
                <div className="dashboard-section-title">Search Results</div>
                <div className="row" style={{ padding: '0px 8px' }}>
                    {results.map(this._renderItem)}
                </div>
                <div className="drop-down-menu-separator"/>
                <div className="dashboard-section-title">Current Events</div>
                <div className="row">
                    {results.map(this._renderItem)}
                </div>
                <div
                    className="cute-button"
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 16,
                    }}
                    onClick={this._onCreate}
                >
                    <i className="ion-ios-add-circle" style={{ marginRight: 6 }}/>
                    Create
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        stringRepo: state.string.stringRepo,
    })
)(StringDashboard)