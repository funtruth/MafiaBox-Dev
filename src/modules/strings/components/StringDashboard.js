import React from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { screenType } from '../types'
import { fuseType } from '../../dropdown/types'

import { stringNavigate } from '../StringReducer'

import DashboardSection from './DashboardSection';

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
        this.props.stringNavigate(screenType.edit)
    }

    _renderItem = (item) => {
        return (
            <div
                key={item.key}
                highlight="true"
                className="dashboard-item"
            >
                <div className="dashboard-item-title">
                    {item.title}
                </div>
                {item.string}
            </div>
        )
    }

    render() {
        const { stringRepo, attach } = this.props

        const { results } = this.state
        const current = _.toArray(attach.value)
        const recent = _.sortBy(stringRepo, i => -i.lastEdit).slice(0, 5)

        return (
            <div className="dashboard" cancel-appclick="true">
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
                <DashboardSection data={results} title="Search Results"/>
                <DashboardSection data={current} title="Current Events"/>
                <DashboardSection data={recent} title="Recent Edits"/>
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
    }),
    {
        stringNavigate,
    }
)(StringDashboard)