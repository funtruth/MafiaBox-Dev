import React from 'react'
import { connect } from 'react-redux'

import { addString, updateStringByPath } from '../../strings/StringReducer'

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
            return
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
                    padding: '8px 0px 0px 0px',
                    maxWidth: '30vw',
                }}
            >
                <input
                    className="tag-input"
                    value={this.state.title}
                    onChange={this._onType}
                    placeholder="Name the event"
                    type='text'
                    autoFocus
                />
                <div className="-separator"/>
                <div
                    id="input"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                    onInput={this._onInput}
                    style={{
                        maxHeight: '10vh',
                        overflowY: 'scroll',
                        margin: '0px 10px'
                    }}
                >{this.string}
                </div>
                <div className="-separator"/>
                <div className="row modal-options">
                    <div className="modal-button" onClick={this._onCreate}>
                        Save
                    </div>
                    <div className="underline-button" onClick={this.props.onClose}>
                        Cancel
                    </div>
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
        addString,
        updateStringByPath,
    }
)(StringEdit)