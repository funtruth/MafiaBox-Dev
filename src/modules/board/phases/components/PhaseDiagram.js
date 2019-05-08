import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import PhaseDiagramItem from './PhaseDiagramItem';
import {
    Body,
} from '../../../components/Common';

const get = (page) => (page && page.phaseMap) || []

function PhaseDiagram(props) {
    const { modeRepo, pageRepo, modeKey } = props

    const phaseMap = get(modeRepo[modeKey])
    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(phaseMap.map(pageKey => pageRepo[pageKey]))
    }, [pageRepo])

    return (
        <Body>
            {items.map(item => (
                <PhaseDiagramItem
                    item={item}
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