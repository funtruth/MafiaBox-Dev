import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { updateStory } from '../../../page/PageReducer'

function RoleHeader(props) {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}
    
    let [title, setTitle] = useState("")
    useEffect(() => {
        setTitle(storyInfo.title)
    }, [storyInfo.title])

    let [showInput, setShowInput] = useState(false)

    const handleText = (e) => setTitle(e.target.value)
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }
    const handleTitleClick = () => setShowInput(true)
    const handleTextBlur = () => {
        if (title) {
            props.updateStory(storyKey, {
                title,
            })
        }
        setShowInput(false)
    }

    return (
        <div className="role-header">
            {showInput ?
                <input
                    className="role-header-input"
                    value={title}
                    placeholder="Untitled"
                    onChange={handleText}
                    autoFocus={true}
                    onBlur={handleTextBlur}
                    onKeyPress={handleKeyPress}
                />
                :<div className="row" style={{ alignItems: 'center' }} onClick={handleTitleClick}>
                    <div className="role-header-title">
                        {title || "Untitled"}
                    </div>
                    <i className="mdi mdi-pencil"></i>
                </div>
            }
            <i className="role-header-close mdi mdi-close" onClick={props.onHide}/>
        </div>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        updateStory,
    }
)(RoleHeader)