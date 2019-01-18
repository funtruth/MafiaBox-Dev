import React from 'react'
import './string.css'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'

import { modalType } from '../modal/types';
import { fuseType } from '../dropdown/types'

import { showModal } from '../modal/ModalReducer'
import { addString } from './StringReducer'
import StringEdit from './components/StringEdit';

class StringDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            results: [],
        }
        this.fuse = new Fuse(_.toArray(props.attach), fuseType.stringDashboard)
    }
    
    _onType = (e) => {
        this.setState({
            searchText: e.target.value,
            results: this.fuse.search(e.target.value),
        })
    }

    _onUpdate = (item) => {
        this.props.showModal(modalType.stringEdit, {
            stringKey: item.key
        })
    }

    _onCreate = () => {
        this.props.addString()
        this.props.showModal()
    }

    render() {
        const { attach } = this.props
        const { searchText, results } = this.state
        const current = searchText ? results : _.toArray(attach.value)

        return (
            <div className="dashboard" cancel-appclick="true">
                <div className="dashboard-results">
                    <input
                        className="tag-input"
                        value={this.state.searchText}
                        onChange={this._onType}
                        placeholder="Search for string"
                        type='text'
                        autoFocus
                        style={{
                            margin: '12px 10px 0px 10px',
                        }}
                    />
                    <div className="-separator"/>
                    {current.map((item, index) => {
                        return (
                            <div
                                key={index}
                                highlight="true"
                                className="dashboard-item"
                                onClick={this._onUpdate.bind(this, item)}
                            >
                                <div className="dashboard-item-title">
                                    {item.title}
                                </div>
                                {item.string}
                            </div>
                        )
                    })}
                    <div className="-separator"/>
                    <div
                        className="dashboard-item dashboard-new-item"
                        onClick={this._onCreate}
                    >
                        <div className="dashboard-item-title">
                            Create Event
                        </div>
                        Make a new event from scratch
                    </div>
                </div>
                <StringEdit {...this.props}/>
            </div>
        )
    }
}

export default connect(
    null,
    {
        addString,
        showModal,
    }
)(StringDashboard)