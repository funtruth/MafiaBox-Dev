import React, { useState } from 'react'
import './CreateProject.css'
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase/app'

import {
    DEFAULT_MEMBER_INFO,
    MEMBER_TYPE,
} from './UserConstants';
import {
    defaultFieldMap,
    defaultFieldRepo,
} from '../../fields/defaults';

import { switchToProject } from '../../firebase/FirebaseReducer'
import { showModal } from '../ModalReducer'
import { checkAlpha } from '../../common/helpers';
import generatePushID from '../../common/generatePushID';

import FormInput from '../../components/FormInput'
import ModalOptions from '../components/ModalOptions'

export default function CreateProject(props) {
    const { uid } = useSelector(state => state.firebase.authUser)
    const dispatch = useDispatch();

    let [errors, setErrors] = useState({})
    
    //initializing project
    let [gameKey, setGameKey] = useState('')
    let [description, setDescription] = useState('')
    
    let handleSave = () => {
        //validate user inputs
        if (!gameKey || !description) {
            setErrors({
                gameKey: !!gameKey ? "" : "*This is a required field.",
                description: !!description ? "" : "*This is a required field",
            })
            return;
        }
        if (!checkAlpha(gameKey, 'A26wSPACE')) {
            setErrors({gameKey: '*Only Alphabetic characters are allowed.'})
            return;
        }
        if (!description || !checkAlpha(description, 'A26N10wDESC')) {
            setErrors({description: '*Only Alphabetic characters are allowed.'})
            return;
        }
        
        //initialize a new project
        const projectKey = generatePushID(gameKey)

        let multiUpdate = {}
        
        multiUpdate[`dev/${projectKey}/fieldMap`] = defaultFieldMap
        multiUpdate[`dev/${projectKey}/fieldRepo`] = defaultFieldRepo
        multiUpdate[`userProjects/${uid}/${projectKey}`] = true
        multiUpdate[`projectUsers/${projectKey}`] = {
            key: projectKey,
            title: gameKey,
            description,
            members: {
                [uid]: {
                    ...DEFAULT_MEMBER_INFO,
                    type: MEMBER_TYPE.OWNER,
                    acceptedInvite: true,
                },
            },
        }
        
        firebase.database().ref().update(multiUpdate)
        dispatch(switchToProject(projectKey))
        dispatch(showModal())
    }

    const handleGameKey = (e) => setGameKey(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    
    return (
        <div className="create-modal">
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
            <ModalOptions onFinish={handleSave}/>
        </div>
    )
}