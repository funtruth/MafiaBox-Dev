import React from 'react'
import _ from 'lodash'

import { useSelector } from 'react-redux'

import Body from '../../components/Body';

export default function ModePublisher({
    path,
    slate,
}){
    const mode = slate.key
    const { activeProject } = useSelector(state => state.firebase)
    const { fieldRepo, pageRepo } = useSelector(state => state.page)

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

    return (
        <Body>

        </Body>
    )
}