import React from 'react'
import { connect } from 'react-redux'
import * as stringTool from '../../strings/stringTool'

import { addString, updateStringByPath } from '../../strings/StringReducer'

import RecipientView from '../../strings/components/RecipientView'

class StringEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.stringKey ? props.stringRepo[props.stringKey].title : '',
            string: props.stringKey ? props.stringRepo[props.stringKey].string : '',
        }
    }

    componentDidMount() {
        document.getElementById("input").addEventListener("input", this._onChange, false);
        document.getElementById('input').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
            }
        });
    }

    _onChange = e => {
        var range = window.getSelection().getRangeAt(0),
            preCaretRange = range.cloneRange(),
            tmp = document.createElement("div"),
            myDiv = document.getElementById("input").firstChild;

        preCaretRange.selectNodeContents(e.target);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        tmp.appendChild(preCaretRange.cloneContents());

        this.setState({
            string: e.target.innerText,
        })

        range.setStart(myDiv, tmp.innerText.length);
        range.setEnd(myDiv, tmp.innerText.length);
    }

    _onType = e => {
        this.setState({
            title: e.target.value,
        })
    }

    _onCreate = () => {
        const { title, string } = this.state
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

    render() {
        const { title, string } = this.state

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 0px 0px 0px',
                    maxWidth: '50vw',
                }}
            >
                <div className="drop-down-section-title">EVENT NAME</div>
                <input
                    className="tag-input"
                    value={title || ''}
                    onChange={this._onType}
                    placeholder="Name the event"
                    type='text'
                    autoFocus
                />
                <div className="-separator"/>
                <div
                    id="input"
                    className="string-edit-box"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                >{string}
                </div>
                <div className="-separator"/>
                <div className="drop-down-section-title">MARKDOWN AND VARIABLES</div>
                <div className="text-box string-edit-box">{stringTool.braceToHtml(string)}</div>
                <div className="-separator"/>
                <div className="drop-down-section-title">RECIPIENTS</div>
                <RecipientView {...this.props}/>
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