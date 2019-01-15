import React from 'react'
import { connect } from 'react-redux'

import { screenType } from '../types'

class StringEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            string: '',
        }
    }

    _onType = e => {
        this.setState({
            title: e.target.value
        })
    }

    _onCreate = () => {
        this.props.navigate(screenType.dashboard)
    }

    _renderItem = (item) => {
        return null
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    height: '40vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <input
                        className="underline-input"
                        value={this.state.title}
                        onChange={this._onType}
                        placeholder="Name the event"
                        type='text'
                        autoFocus
                        style={{
                            marginTop: 12,
                            marginRight: 'auto',
                            width: '100%',
                        }}
                    />
                    <div className="drop-down-menu-separator"/>
                    <div
                        contentEditable="true"
                        style={{
                            maxHeight: '20vh',
                            overflow: 'auto',
                        }}
                    >
                    </div>
                    <div
                        className="underline-button"
                        style={{
                            marginTop: 4,
                            marginLeft: 'auto',
                            color: '#d6d6d6',
                        }}
                        onClick={this._onCreate}
                    >
                        Create
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        stringRepo: state.string.stringRepo,
    })
)(StringEdit)