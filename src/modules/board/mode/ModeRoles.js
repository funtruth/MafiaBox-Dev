import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Body, Tag, Text } from '../../components/Common';
import { getAllPhases } from '../phases/helpers';
import { updateGeneral } from '../../page/PageReducer';

export default function ModeRoles({
    path,
    slate,
}){
    const { gameState, allPhases = [] } = slate

    const dispatch = useDispatch()
    const { pageRepo } = useSelector(state => state.page)

    // TODO view should say pick an initial phase first
    if (!gameState || !gameState.phase || !gameState.phase.value) return null

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
    console.log({path})
    return (
        <Body x="l">
            <Text>All phases</Text>
            {allPhases.map(renderItem)}
            <Tag
                icon="refresh"
                text="refresh"
                onClick={checkForPhases}
            />
        </Body>
    )
}