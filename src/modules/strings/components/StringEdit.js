import React from 'react'
import { connect } from 'react-redux'

import { screenType } from '../types'

import { addString, updateStringByPath, stringNavigate } from '../StringReducer'

class StringEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.stringKey ? props.stringRepo[props.stringKey].title : '',
        }
        this.string = props.stringKey ? props.stringRepo[props.stringKey].string : ''
    }

    componentDidMount() {
        document.getElementById("input").addEventListener("input", this._onChange, false);
    }

    _onChange = e => {
        console.log({e: e.target})
        this.string = e.target.textContent
    }

    _onType = e => {
        this.setState({
            title: e.target.value,
        })
    }

    _onInput = e => {
        this.string = e.target.textContent
    }

    _onCreate = () => {
        const { title } = this.state
        const { string } = this
        const { stringKey } = this.props

        if (!title) {
            return this.props.stringNavigate(screenType.dashboard)
        }

        if (stringKey) {
            this.props.updateStringByPath(
                stringKey,
                {
                    title,
                    string,
                    lastEdit: Date.now(),
                }
            )
        } else {
            this.props.addString({
                title,
                string,
            })
        }
        this.props.stringNavigate(screenType.dashboard)
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
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px 0px',
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
                        id="input"
                        contentEditable="true"
                        suppressContentEditableWarning="true"
                        onInput={this._onInput}
                        style={{
                            maxHeight: '20vh',
                            overflow: 'auto',
                        }}
                    >{this.string}
                    </div>
                    <div
                        className="underline-button"
                        style={{
                            marginTop: 4,
                            marginLeft: 'auto',
                            color: '#d6d6d6',
                            paddingRight: 2,
                        }}
                        onClick={this._onCreate}
                    >
                        Save
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        stringRepo: state.string.stringRepo,
        stringKey: state.string.stringKey,
    }),
    {
        addString,
        updateStringByPath,
        stringNavigate,
    }
)(StringEdit)