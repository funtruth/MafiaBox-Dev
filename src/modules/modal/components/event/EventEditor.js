import React, { useEffect } from 'react'
import * as stringTool from '../../../strings/stringTool'
import * as helpers from '../../../common/helpers'

import { StatefulSourceId } from '../../../dropdown/types';

import EventRecipients from './EventRecipients'
import EventBlur from './EventBlur';

export default function EventEditor(props) {
    const { workspace, setWorkspace } = props
    
    const { selectedKey, value } = workspace
    const selectedItem = value[selectedKey] || {}
    const { string } = selectedItem

    useEffect(() => {
        const target = document.getElementById('text-editor-input')

        const muteKey = (evt) => {if (evt.which === 13) evt.preventDefault()}
        const handleType = e => {
            //Edgecase: empty text handler
            if (!e.target.textContent) {
                setWorkspace(
                    helpers.updateByPath(
                        ['value', selectedKey, 'string'],
                        "",
                        workspace,
                    )
                )
                return
            }

            var range = window.getSelection().getRangeAt(0),
                preCaretRange = range.cloneRange(),
                tmp = document.createElement("div"),
                myDiv = target.firstChild;

            preCaretRange.selectNodeContents(e.target);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            tmp.appendChild(preCaretRange.cloneContents());

            setWorkspace(
                helpers.updateByPath(
                    ['value', selectedKey, 'string'],
                    e.target.innerText,
                    workspace,
                )
            )

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

    return (
        <div className="dashboard-edit -y-p">
            <div className="dashboard-section-title">Event Text</div>
            <div
                id="text-editor-input"
                className="string-edit-box"
                contentEditable="true"
                suppressContentEditableWarning="true"
            >
                {string || ''}
            </div>
            <div className="-sep"/>
            <div className="dashboard-section-title">Markdown and Variables</div>
            <div className="text-box string-edit-box">
                {stringTool.braceToHtml(
                    string,
                    StatefulSourceId.editEvent,
                    ['value', selectedKey],
                )}
            </div>
            <div className="-sep"/>
            <div className="dashboard-section-title">Recipients</div>
            <EventRecipients {...props}/>
            {!selectedKey && <EventBlur/>}
        </div>
    )
}