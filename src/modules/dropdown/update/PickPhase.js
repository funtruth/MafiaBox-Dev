import React from 'react'
import { connect } from 'react-redux'

import { updateType } from '../../common/types'
import { VAR_DEFAULTS } from '../../common/defaults'

import {
    DropItem,
    DropScroll,
    DropTitle,
} from '../components/Common'

/*@param modeKey
    modeKey     => browse modeRepo for phaseMap
    phaseMap    => array of pageKeys
    pageKey     => browse pageRepo for pages
*/
function PickPhase(props) {
    const { modeRepo, modeKey, pageRepo } = props

    if (!modeKey) return null;
    const phaseMap = (modeRepo[modeKey] && modeRepo[modeKey].phaseMap) || []
    
    const handleClick = (pageKey) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: pageKey,
            display: pageRepo[pageKey].title,
            updateType: updateType.page,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>phases</DropTitle>
            <DropScroll>
                {phaseMap.map((item) => {
                    const title = pageRepo[item] && pageRepo[item].title
                    if (!title) return null;

                    return (
                        <DropItem
                            key={item}
                            onClick={() => handleClick(item)}
                            text={pageRepo[item] && pageRepo[item].title}
                        />
                    )
                })}
            </DropScroll>
        </>
    )
}

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
        pageRepo: state.page.pageRepo,
    }),
)(PickPhase)