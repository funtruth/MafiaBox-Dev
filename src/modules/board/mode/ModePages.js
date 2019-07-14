import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import _ from 'lodash'

import { fieldType } from '../../fields/types';

import { getAllPhases, getAllRoles } from '../phases/helpers';
import { updateGeneral } from '../../page/PageReducer';
import { getCode } from '../../logic/LogicEngine';

import { Body, Tag, Text, Row } from '../../components/Common';

export default function ModePages({
    path,
    slate,
}){
    const { gameState, allPhases = [], roleSetup, allRoles, key: mode } = slate

    const dispatch = useDispatch()
    const { pageRepo, fieldRepo } = useSelector(state => state.page)
    const { activeProject } = useSelector(state => state.firebase)

    // TODO view should say pick an initial phase first
    if (!gameState || !gameState.phase || !gameState.phase.value) return null

    const publishAll = (pages) => {
        if (!pages) return;

        pages.forEach(pageKey => publishPage(pageKey))
        console.log("published!")
    }
        
    const publishPage = (pageKey) => {
        if (!pageKey) return;
        if (!activeProject) return console.warn('no active project')
        if (!mode || !pageRepo[mode]) return console.warn('invalid mode', mode)
        if (!pageRepo[pageKey]) return console.warn('invalid pageKey', pageKey)
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
                        if (!choiceClone[choice]) continue
                        for (var property in choiceClone[choice]) {
                            if (choiceClone[choice][property].byId && choiceClone[choice][property].byIndex) {
                                update[field][choice][property] = getCode(choiceClone[choice][property])
                            }
                        }
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

    const checkForPhases = () => {
        const results = getAllPhases({
            repo: pageRepo,
            phase: gameState.phase.value,
            arr: [gameState.phase.value],
        })

        dispatch(updateGeneral({
            path,
            update: {
                allPhases: results,
            }
        }))
    }

    const checkForRoles = () => {
        const results = getAllRoles(roleSetup)

        dispatch(updateGeneral({
            path,
            update: {
                allRoles: results,
            }
        }))
    }


    const renderItem = (phaseKey) => {
        if (!phaseKey) return null;
        const pageInfo = pageRepo[phaseKey]

        return (
            <Tag
                key={phaseKey}
                text={pageInfo.title || 'Untitled'}
            />
        )
    }
    
    return (
        <Body x="l">
            <Text>All phases</Text>
            <Row>
                {allPhases.map(renderItem)}
            </Row>
            <Row>
                <Tag
                    icon="refresh"
                    text="refresh"
                    onClick={checkForPhases}
                />
                <Tag
                    icon="publish"
                    text="Publish phases"
                    onClick={() => publishAll(allPhases)}
                />
            </Row>
            <Text>All roles</Text>
            <Row>
                {allRoles.map(renderItem)}
            </Row>
            <Row>
                <Tag
                    icon="refresh"
                    text="refresh"
                    onClick={checkForRoles}
                />
                <Tag
                    icon="publish"
                    text="Publish phases"
                    onClick={() => publishAll(allRoles)}
                />
            </Row>
        </Body>
    )
}