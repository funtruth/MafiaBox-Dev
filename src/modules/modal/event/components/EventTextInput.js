import React from 'react'
import _ from 'lodash'

export default function EventTextInput(props) {
    const { workspace, setWorkspace, text, setText, selectedEvent, setError } = props
    const { eventIndex, stringIndex, selectedColor, eventArr } = workspace

    let handleSubmit = () => {
        if (!text) return;
        if (!selectedEvent) {
            setError('You must select an event first.')
            return;
        }

        let arrClone = _.cloneDeep(eventArr)
        if (stringIndex === '') {
            arrClone[eventIndex].stringArr.push({
                string: text,
                color: selectedColor,
            })
            setWorkspace({
                ...workspace,
                eventArr: arrClone,
                stringIndex: '',
            })
        } else {
            setWorkspace({
                ...workspace,
                stringIndex: '',
            })
        }
        
        setText('')
    }

    let handleChange = (e) => {
        if (stringIndex !== '') {
            let arrClone = _.cloneDeep(eventArr)
            arrClone[eventIndex].stringArr[stringIndex].string = e.target.value
            setWorkspace({
                ...workspace,
                eventArr: arrClone,
            })
        }

        setText(e.target.value)
    }

    let handleKey = (e) => {
        switch(e.nativeEvent.key) {
            case 'Enter':
            handleSubmit();
                e.preventDefault();
                handleSubmit();
                break
            default:
        }
    }

    return (
        <textarea
            id="event-editor-textarea"
            className="dashboard-input"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKey}
            placeholder={workspace.selectedKey?"Type a string and press enter ...":"Select or create an event ..."}
            type="text"
        />
    )
}