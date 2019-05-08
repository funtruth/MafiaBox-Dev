import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import PhaseDiagramItem from './PhaseDiagramItem';
import {
    Body,
} from '../../../components/Common';
import PhaseDiagramArrow from './PhaseDiagramArrow';

const get = (page) => (page && page.phaseMap) || []

function PhaseDiagram(props) {
    const { modeRepo, pageRepo, modeKey } = props

    const phaseMap = get(modeRepo[modeKey])
    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(phaseMap.map(pageKey => pageRepo[pageKey]))
    }, [pageRepo])

    //TODO parse for arrows
    const [arrows, setArrows] = useState([])
    
    return (
        <Body style={{position: 'relative'}}>
            {items.map(item => (
                <PhaseDiagramItem
                    key={item.pageKey}
                    item={item}
                    arrows={arrows}
                    setArrows={setArrows}
                />
            ))}
            {arrows.map((item, index) => (
                <PhaseDiagramArrow
                    key={index}
                    {...item}
                />
            ))}
        </Body>
    )
}

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
        pageRepo: state.page.pageRepo,
    }),
    {
    }
)(PhaseDiagram)