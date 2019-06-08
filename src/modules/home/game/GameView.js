import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateProject } from '../../firebase/FirebaseReducer';

import { Body, Input, Tag, TextArea } from '../../components/Common';
import AdminView from './AdminView'

export default function GameView({match, path}) {
    const dispatch = useDispatch();
    const { projectUsers } = useSelector(state => state.firebase)

    const { projectKey } = match.params

    const project = projectUsers[projectKey]
    
    if (!project) return null;

    const handleTitle = (title) => {
        dispatch(updateProject({
            path,
            update: {title}
        }))
    }

    const handleDescription = (description) => {
        dispatch(updateProject({
            path,
            update: {description}
        }))
    }

    return (
        <Body>
            <Tag
                size="l"
                icon="format-title"
                text="Game title"
                bg="transparent"
            />
            <Input
                theme="title"
                value={project.title}
                onSubmit={handleTitle}
                submitOnBlur
                placeholder="Untitled"
                type="text"
                outerprops={{sizes: ['z', 'm']}}
            />
            <Tag
                size="l"
                icon="format-title"
                text="Description"
                bg="transparent"
            />
            <TextArea
                value={project.description}
                onSubmit={handleDescription}
                placeholder="Enter a short description of the game ..."
                type="text"
                outerprops={{sizes: ['z', 'm']}}
            />
            <AdminView/>
        </Body>
    )
}