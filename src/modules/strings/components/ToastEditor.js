import React from 'react'
import * as stringTool from '../stringTool'

class ToastEditor extends React.Component {
    componentDidMount() {
        document.getElementById("input").addEventListener("input", this._onTypeString, false);
        document.getElementById('input').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
            }
        });
    }

    _onTypeString = e => {
        //Edgecase: empty text handler
        if (!e.target.textContent) {
            this.props.onEdit({
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

        this.props.onEdit({
            string: e.target.innerText,
        })

        range.setStart(myDiv, tmp.innerText.length);
        range.setEnd(myDiv, tmp.innerText.length);
    }

    render() {
        const { attach } = this.props
        const selectedItem = attach || {}
        const { string } = selectedItem

        return (
            <div className="dashboard-edit -y-m" style={{ width: '100%' }}>
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
            </div>
        )
    }
}

export default ToastEditor