import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { parsePhaseArrows } from '../helpers'

import PhaseDiagramItem from './PhaseDiagramItem';
import PhaseDiagramArrow from './PhaseDiagramArrow';
import PhaseDiagramPointer from './PhaseDiagramPointer';
import {
    Body,
} from '../../../components/Common';

const get = (page) => (page && page.phaseMap) || []

function PhaseDiagram(props) {
    const { modeInfo, pageRepo, modeKey } = props

    const phaseMap = get(modeInfo)

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
                    modeKey={modeKey}
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

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(PhaseDiagram)