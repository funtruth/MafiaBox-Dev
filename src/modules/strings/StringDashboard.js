import React from 'react'
import './string.css'
import _ from 'lodash'
import Fuse from 'fuse.js'
import { connect } from 'react-redux'
import * as helpers from '../common/helpers'

import { fuseType } from '../dropdown/types'

import { showModal, updateTopModal } from '../modal/ModalReducer'
import TextEditor from './components/TextEditor';

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

    _onEdit = (item) => {
        document.getElementById('title-input').focus()
        this.props.updateTopModal('selectedKey', item.key)
    }

    _onCreate = () => {
        const { attach } = this.props
        const newKey = helpers.genUID('string', attach.value)
        const newItem = {
            key: newKey,
            lastEdit: Date.now()
        }

        document.getElementById('title-input').focus()
        this.props.onEdit(newKey, newItem)
        this.props.updateTopModal('selectedKey', newKey)
    }

    render() {
        const { attach } = this.props
        const { searchText, results } = this.state
        const current = searchText ? results : _.toArray(attach.value)

        return (
            <div className="dashboard" cancel-appclick="true">
                <div className="dashboard-results border-right">
                    <input
                        className="tag-input"
                        value={this.state.searchText}
                        onChange={this._onType}
                        placeholder="Search for event"
                        type='text'
                        autoFocus
                        style={{
                            margin: '12px 10px 0px 10px',
                        }}
                    />
                    <div className="-sep"/>
                    {current.length ?
                        current.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    highlight="true"
                                    className="dashboard-item"
                                    onClick={this._onEdit.bind(this, item)}
                                >
                                    <div className="dashboard-item-title">
                                        {item.title}
                                    </div>
                                    {item.string}
                                </div>
                            )
                        })
                        :<div className="empty-text">
                            No events found
                        </div>
                    }
                    <div className="-sep"/>
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
                <TextEditor {...this.props}/>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showModal,
        updateTopModal,
    }
)(StringDashboard)