import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { parsePhaseArrows } from '../helpers'

import PhaseDiagramItem from './PhaseDiagramItem';
import PhaseDiagramArrow from './PhaseDiagramArrow';
import PhaseDiagramPointer from './PhaseDiagramPointer';
import {
    Body,
} from '../../../components/Common';

const get = (page) => (page && page.phaseMap) || []

export default function PhaseDiagram({slate}) {
    const pageRepo = useSelector(state => state.page.pageRepo)

    const phaseMap = get(slate)

    const [items, setItems] = useState([])
    const [arrows, setArrows] = useState([])
    const [pointer, setPointer] = useState({})
    useEffect(() => {
        const focusedItems = phaseMap.map(pageKey => pageRepo[pageKey])
        setItems(focusedItems)
        setArrows(parsePhaseArrows(focusedItems, pageRepo))
    }, [pageRepo])
    
    return (
        <Body style={{position: 'relative'}}>
            {items.map(item => (
                <PhaseDiagramItem
                    key={item.pageKey}
                    modeKey={slate.key}
                    item={item}
                    pointer={pointer}
                    setPointer={setPointer}
                />
            ))}
            {arrows.map((item, index) => (
                <PhaseDiagramArrow
                    key={index}
                    {...item}
                />
            ))}
            <PhaseDiagramPointer {...pointer}/>
        </Body>
    )
}