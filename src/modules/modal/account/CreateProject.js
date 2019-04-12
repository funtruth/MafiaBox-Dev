import React, { useState, useEffect } from 'react'
import './CreateProject.css'
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import {
    DEFAULT_MEMBER_INFO,
    MEMBER_TYPE,
} from './UserConstants';
import {
    defaultFieldMap,
    defaultFieldRepo,
} from '../../fields/defaults';

import * as helpers from '../../common/helpers'
import {
    getMyInfo,
    switchToProject,
} from '../../firebase/FirebaseReducer'

import FormInput from '../../components/FormInput'
import ModalOptions from '../components/ModalOptions'
import Modal from '../components/Modal';

function CreateProject(props) {
    const { uid } = props

    let [errors, setErrors] = useState({})
    
    //initializing project
    let [gameKey, setGameKey] = useState('')
    let [description, setDescription] = useState('')
    let [members] = useState({
        [uid]: {
            ...DEFAULT_MEMBER_INFO,
            type: MEMBER_TYPE.OWNER,
            acceptedInvite: true,
            ...props.getMyInfo(),
        },
    })

    //get existing project keys
    let [projects, setProjects] = useState({})
    const projectsRef = firebase.database().ref(`projects`)
    useEffect(() => {
        projectsRef.once('value', snap => setProjects(snap.val()))
    }, [])
    
    let handleSave = () => {
        //validate user inputs
        if (!gameKey || !description) {
            setErrors({
                gameKey: !!gameKey ? "" : "*This is a required field.",
                description: !!description ? "" : "*This is a required field",
            })
            return;
        }
        if (!helpers.checkAlpha(gameKey, 'A26wSPACE')) {
            setErrors({gameKey: '*Only Alphabetic characters are allowed.'})
            return;
        }
        if (!description || !helpers.checkAlpha(description, 'A26N10wDESC')) {
            setErrors({description: '*Only Alphabetic characters are allowed.'})
            return;
        }
        
        //initialize a new project
        const projectKey = helpers.genUID(gameKey, projects, '-xxxx')

        let multiUpdate = {}
        
        multiUpdate[`userProjects/${uid}/${projectKey}`] = true
        multiUpdate[`projects/${projectKey}`] = {
            projectKey,
            title: gameKey,
            description,
            members,
        }
        multiUpdate[`dev/${projectKey}/fieldMap`] = defaultFieldMap
        multiUpdate[`dev/${projectKey}/fieldRepo`] = defaultFieldRepo
        
        firebase.database().ref().update(multiUpdate)
        props.switchToProject(projectKey)
        props.popModalBy(1)
    }

    const handleGameKey = (e) => setGameKey(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    
    return (
        <Modal>
            <div className="create-modal" cancel-appclick="true">
                <FormInput
                    title="Game Title"
                    error={errors.gameKey}
                    value={gameKey}
                    setValue={handleGameKey}
                />
                <FormInput
                    title="Game Description"
                    error={errors.description}
                    value={description}
                    setValue={handleDescription}
                />
                <ModalOptions
                    error={errors.modal}
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
        </Modal>
    )
}

export default connect(
    state => ({
        uid: state.firebase.authUser.uid,
    }),
    {
        getMyInfo,
        switchToProject,
    }
)(CreateProject)