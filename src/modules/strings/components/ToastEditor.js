import React from 'react'
import * as stringTool from '../stringTool'
import { StatefulSourceId } from '../../dropdown/types';

class ToastEditor extends React.Component {
    componentDidMount() {
        document.getElementById("toast-editor-input").addEventListener("input", this._onTypeString, false);
        document.getElementById('toast-editor-input').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
            }
        });
    }

    _onTypeString = e => {
        //Edgecase: empty text handler
        if (!e.target.textContent) {
            this.props.setWorkspace({
                string: "",
            })
            return
        }

        var range = window.getSelection().getRangeAt(0),
            preCaretRange = range.cloneRange(),
            tmp = document.createElement("div"),
            myDiv = document.getElementById("toast-editor-input").firstChild;

        preCaretRange.selectNodeContents(e.target);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        tmp.appendChild(preCaretRange.cloneContents());

        this.props.setWorkspace({
            string: e.target.innerText,
        })

        range.setStart(myDiv, tmp.innerText.length);
        range.setEnd(myDiv, tmp.innerText.length);
    }

    render() {
        const { workspace } = this.props
        const selectedItem = workspace || {}
        const { string } = selectedItem

        return (
            <div className="dashboard-edit -y-p" style={{ width: '100%' }}>
                <div className="dashboard-section-title">RAW TEXT</div>
                <div
                    id="toast-editor-input"
                    className="string-edit-box"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                >
                    {string || ''}
                </div>
                <div className="-sep"/>
                <div className="dashboard-section-title">MARKDOWN AND VARIABLES</div>
                <div className="text-box string-edit-box">
                    {stringTool.braceToHtml(string, StatefulSourceId.editToast)}
                </div>
            </div>
        )
    }
}

export default ToastEditor