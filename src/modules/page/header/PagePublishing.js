import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import { dropdownType } from '../../dropdown/types'

import { showDropdown } from '../../dropdown/DropdownReducer'

function PagePublishing(props) {
    const [error, setError] = useState("") //TODO error needs to be an object passed to FieldView

    const { path, pageInfo, pageKey, activeProject } = props
    const { title, published } = pageInfo

    useEffect(() => {
        const repoRef       = firebase.database().ref(`library/${activeProject}/pageRepo/${pageKey}`)
        const historyRef    = firebase.database().ref(`library/${activeProject}/pageHistory/${pageKey}`)

        repoRef.on('value', snap => console.log("repo"))
        historyRef.on('value', snap => console.log("history"))

        return () => {
            console.log("turning off publishing listeners")
            if (repoRef) repoRef.off();
            if (historyRef) historyRef.off();
        };
    }, [pageKey])

    const handleClick = (e) => {
        if (published) {
            props.showDropdown(dropdownType.pageHistory, e)
            return;
        }

        if (!title) {
            setError("Cannot publish without a title.")
            return;
        }

        props.updatePage(path, {
            published: true,
            publishedAt: Date.now(),
        })
        
        const repoRef = firebase.database().ref(`library/${activeProject}/pageRepo/${pageKey}`)
        repoRef.update(pageInfo)

        setError("")
    }
    
    const buttonRef = useRef(null)
    useEffect(() => {
        buttonRef.current.addEventListener('click', handleClick)
        return () => {
            buttonRef.current.removeEventListener('click', handleClick)
        }
    }, [buttonRef])

    return (
        <>
            <div className="page-header-error">{error}</div>
            <div
                ref={buttonRef}
                className="row page-header-button app-onclick"
            >
                <i className={`page-header-icon mdi ${published ? "mdi-bookmark-check" : "mdi-publish"}`}></i>
                {published ? "Published" : "Publish"}
            </div>
        </>
    )
}

export default connect(
    state => ({
        activeProject: state.firebase.activeProject,
    }),
    {
        showDropdown,
    }
)(PagePublishing)