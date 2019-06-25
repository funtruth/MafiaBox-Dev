import React from 'react'
import _ from 'lodash'
import firebase from 'firebase/app'
import { useSelector } from 'react-redux'

import { Body, Tag, Row, Input } from '../../components/Common'
import { getCode } from '../../logic/LogicEngine';
import { fieldType } from '../../fields/types';

export default function AdminView(props) {
    const { activeProject, projectUsers } = useSelector(state => state.firebase)
    const project = projectUsers[activeProject] || {}

    const { pageRepo, fieldRepo } = useSelector(state => state.page)
    var mode;

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
        mode = modeKey;
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

    const publishPage = (pageKey) => {
        if (!activeProject) return console.warn('no active project')
        if (!mode || !pageRepo[mode]) return console.warn('invalid mode', mode)
        if (!pageKey || !pageRepo[pageKey]) return console.warn('invalid pageKey', pageKey)
        const pageItem = pageRepo[pageKey]

        const path = `projectsLive/${activeProject}/modes/${mode}/pageRepo/${pageKey}`
        const update = {}
        for (var field in pageItem) {
            if (!fieldRepo[field]) continue
            switch(fieldRepo[field].type) {
                case fieldType.logic.key:
                    update[field] = getCode(pageItem[field])
                    break
                case fieldType.generalTag.key:
                    Object.assign(update, pageItem[field] || {})
                    break
                case fieldType.gameChoices.key:
                case fieldType.gameChoiceOverride.key:
                    let choiceClone = _.cloneDeep(pageItem[field])
                    update[field] = pageItem[field]
                    for (var choice in choiceClone) {
                        if (!choiceClone[choice] || !choiceClone[choice].logic) continue
                        update[field][choice].logic = getCode(choiceClone[choice].logic)
                    }
                    break
                default:
                    update[field] = pageItem[field]
            }
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
                text="Publish role"
                bg="darkpurple"
            />
            <Row>
                {_.filter(pageRepo, i => i.board === 'roles').map(item => (
                    <Tag
                        key={item.key}
                        text={item.title}
                        onClick={() => publishPage(item.key)}
                    />
                ))}
            </Row>
            <Tag
                icon="auto-fix"
                text="Publish phase"
                bg="darkpurple"
            />
            <Row>
                {_.filter(pageRepo, i => i.board === 'phases').map(item => (
                    <Tag
                        key={item.key}
                        text={item.title}
                        onClick={() => publishPage(item.key)}
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
        </Body>
    )
}