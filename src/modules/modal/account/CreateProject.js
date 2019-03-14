import React, { useState, useEffect } from 'react'
import './CreateProject.css'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import * as helpers from '../../common/helpers'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';

function CreateProject(props) {
    const { attach, path, uid } = props
    const workspace = attach

    let [error, setError] = useState('')
    
    //initializing project
    let [gameKey, setGameKey] = useState('')
    let [members, setMembers] = useState({})

    //get existing project keys
    let [projects, setProjects] = useState({})
    const projectsRef = firebase.database().ref(`projects`)
    useEffect(() => {
        projectsRef.once('value', snap => setProjects(snap.val()))
    }, [])
    
    let handleSave = () => {
        let batchUpdate = {}
        
        const projectKey = helpers.genUID(gameKey, projects, '-xxxx')

        batchUpdate[`userProjects/${uid}/${projectKey}`] = {
            key: projectKey,
            members,
        }
        
        firebase.database().ref().update(batchUpdate)
        props.popModalBy(1)
    }

    const handleId = (e) => setGameKey(e.target.value)
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div className="create-modal" cancel-appclick="true">
                <div className="create-modal-view">
                    <div
                        style={{
                            width: '50%',
                        }}
                    >
                        <input
                            className="create-input"
                            value={gameKey} 
                            type="text"
                            onChange={handleId}
                        />
                    </div>
                </div>
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
        </ModalCheckSave>
    )
}

export default connect(
    state => ({
        uid: state.firebase.authUser.uid,
    })
)(CreateProject)