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
        const { stringRepo, stringKey } = this.props
        const { title, string } = stringRepo[stringKey]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 0px 0px 0px',
                    maxWidth: '30vw',
                }}
            >
                <div className="drop-down-section-title">EVENT NAME</div>
                <div
                    className="tag-input"
                    style={{
                        cursor: 'default',
                    }}
                >
                    {title}
                </div>
                <div className="-separator"/>
                <div
                    id="input"
                    className="text-box"
                    style={{
                        maxHeight: '10vh',
                        overflowY: 'scroll',
                        margin: '0px 10px'
                    }}
                >{this.string}
                </div>
                <div className="-separator"/>
                <div className="drop-down-section-title">VARIABLES</div>
                <div className="-separator"/>
                <div className="drop-down-section-title">RECIPIENTS</div>
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