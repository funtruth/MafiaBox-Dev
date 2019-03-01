import React, { useEffect } from 'react'
import * as stringTool from '../stringTool'
import { StatefulSourceId } from '../../dropdown/types';

export default function ToastEditor(props) {
    useEffect(() => {
        const target = document.getElementById('toast-editor-input')

        const muteKey = (evt) => {if (evt.which === 13) evt.preventDefault()}
        const handleType = e => {
            //Edgecase: empty text handler
            if (!e.target.textContent) {
                props.setWorkspace({
                    string: "",
                })
                return
            }

            var range = window.getSelection().getRangeAt(0),
                preCaretRange = range.cloneRange(),
                tmp = document.createElement("div"),
                myDiv = target.firstChild;

            preCaretRange.selectNodeContents(e.target);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            tmp.appendChild(preCaretRange.cloneContents());

            props.setWorkspace({
                string: e.target.innerText,
            })

            range.setStart(myDiv, tmp.innerText.length);
            range.setEnd(myDiv, tmp.innerText.length);
        }

        target.addEventListener("input", handleType, false);
        target.addEventListener('keypress', muteKey);
        return () => {
            target.removeEventListener("input", handleType, false);
            target.removeEventListener('keypress', muteKey);
        }
    })

    const { workspace } = props
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