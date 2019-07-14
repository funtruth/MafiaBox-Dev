import React from 'react'
import _ from 'lodash'
import firebase from 'firebase/app'
import { useSelector } from 'react-redux'

import runAllTests from '../../../tests/tests'

import { Body, Tag, Row, Input } from '../../components/Common'

export default function AdminView() {
    const { activeProject, projectUsers } = useSelector(state => state.firebase)
    const project = projectUsers[activeProject] || {}

    const { pageRepo } = useSelector(state => state.page)

    const publishProject = () => {
        if (!activeProject) return console.warn('no active project')

        const path = `projectsLive/${activeProject}`
        const update = {
            key: activeProject,
            title: project.title,
            description: project.description,
        }
        try {
            firebase.database().ref(path).update(update)
        } catch {
            console.log('there was an error updating to Firebase', {update})
        }
    }

    const publishMode = (modeKey) => {
        if (!activeProject) return console.warn('no active project')
        if (!modeKey || !pageRepo[modeKey]) return console.warn('invalid modeKey', pageRepo, modeKey)
        const modeItem = pageRepo[modeKey]
        console.log({modeItem})

        const path = `projectsLive/${activeProject}/modes/${modeKey}`
        const update = {
            key: modeKey,
            title: modeItem.title,
            gameState: _.mapValues(modeItem.gameState, i => i.value),
            roleSetup: modeItem.roleSetup,
            playerNum: modeItem.playerNum,
        }
        try {
            firebase.database().ref(path).update(update)
        } catch {
            console.log('there was an error updating to Firebase', {update})
        }
    }

    const publishImage = (url) => {
        if (!url) return;
        const path = 'images'

        try {
            firebase.database().ref(path).push(url)
        } catch {
            console.log("there was an error", {path, url})
        }
    }

    const deleteUsers = () => {
        // TODO
    }
    
    return(
        <Body x="l" sizes={['s', 'xs']}>
            <Tag
                size="l"
                icon="auto-fix"
                text="Admin tools"
                bg="transparent"
            />
            <Tag
                icon="auto-fix"
                text="Publish project"
                onClick={publishProject}
                bg="darkpurple"
            />
            <Tag
                icon="auto-fix"
                text="Run all tests"
                onClick={runAllTests}
                bg="darkpurple"
            />
            <Row>
                <Tag
                    text={activeProject}
                    bg="fb"
                />
                <Tag
                    text={project.title}
                    bg="fb"
                />
                <Tag
                    text={project.description}
                    bg="fb"
                />
            </Row>
            <Tag
                icon="auto-fix"
                text="Publish mode"
                bg="red"
            />
            <Row>
                {_.filter(pageRepo, i => i.board === 'modes').map(item => (
                    <Tag
                        key={item.key}
                        text={item.title}
                        onClick={() => publishMode(item.key)}
                    />
                ))}
            </Row>
            <Tag
                icon="auto-fix"
                text="Store ImageSrc"
                bg="darkpurple"
            />
            <Input
                theme="tag"
                onSubmit={publishImage}
                type="text"
            />
            <Tag
                text="delete users"
                onClick={deleteUsers}
            />
        </Body>
    )
}