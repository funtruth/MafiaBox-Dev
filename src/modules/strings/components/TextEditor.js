import React from 'react'
import * as stringTool from '../stringTool'

import RecipientView from './RecipientView'
import TextBlur from './TextBlur';

class TextEditor extends React.Component {
    componentDidMount() {
        document.getElementById("input").addEventListener("input", this._onTypeString, false);
        document.getElementById('input').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
            }
        });
    }

    _onTypeTitle = e => {
        const { selectedKey } = this.props
        this.props.onEdit(selectedKey, {
            title: e.target.value,
        })
    }

    _onTypeString = e => {
        const { selectedKey } = this.props
        
        //Edgecase: empty text handler
        if (!e.target.textContent) {
            this.props.onEdit(selectedKey, {
                string: "",
            })
            return
        }

        var range = window.getSelection().getRangeAt(0),
            preCaretRange = range.cloneRange(),
            tmp = document.createElement("div"),
            myDiv = document.getElementById("input").firstChild;

        preCaretRange.selectNodeContents(e.target);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        tmp.appendChild(preCaretRange.cloneContents());

        this.props.onEdit(selectedKey, {
            string: e.target.innerText,
        })

        range.setStart(myDiv, tmp.innerText.length);
        range.setEnd(myDiv, tmp.innerText.length);
    }

    render() {
        const { selectedKey, attach } = this.props
        const selectedItem = (attach.value && attach.value[selectedKey]) || {}
        const { title, string } = selectedItem

        return (
            <div className="dashboard-edit -y-m">
                <div className="dashboard-section-title">EVENT NAME</div>
                <input
                    id="title-input"
                    className="tag-input"
                    value={title || ''}
                    onChange={this._onTypeTitle}
                    placeholder="Name the event"
                    type='text'
                />
                <div className="-sep"/>
                <div className="dashboard-section-title">RAW TEXT</div>
                <div
                    id="input"
                    className="string-edit-box"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                >
                    {string || ''}
                </div>
                <div className="-sep"/>
                <div className="dashboard-section-title">MARKDOWN AND VARIABLES</div>
                <div className="text-box string-edit-box">
                    {stringTool.braceToHtml(string || '')}
                </div>
                <div className="-sep"/>
                <div className="dashboard-section-title">RECIPIENTS</div>
                <RecipientView {...this.props}/>
                {!selectedKey && <TextBlur/>}
            </div>
        )
    }
}

export default TextEditor