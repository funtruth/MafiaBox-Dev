import React, { useState } from 'react'
import { connect } from 'react-redux';

import { PHASE_DIAGRAM_ITEM } from '../Constants'
import {
    modalType,
    updateSourceType,
} from '../../../common/types'

import { isChildOf } from '../../../common/arrows'
import { showModal } from '../../../modal/ModalReducer'
import { updateGeneral, connectPhases } from '../../../page/PageReducer'

import {
    Body,
    Text,
} from '../../../components/Common';

function PhaseDiagramItem(props) {
    const { item, modeKey, setPointer } = props
    const { title, pageKey, diagramXY } = item
    const { x, y } = diagramXY || {}

    const [offsetX, setOffsetX] = useState(x||0)
    const [offsetY, setOffsetY] = useState(y||0)

    const [selected, setSelected] = useState(false)

    //when the body is selected (and possibly moved)
    const onBody = (e) => {
        //save initial coordinates
        const { pageX, pageY } = e

        //show as selected
        setSelected(true)

        //create listeners
        const onMouseMove = (e) => {
            setOffsetX(e.pageX - pageX + offsetX)
            setOffsetY(e.pageY - pageY + offsetY)
        }
        const onMouseUp = (e) => {
            //if item has moved, just send an update on XY
            if (e.pageX !== pageX || e.pageY !== pageY) {
                props.updateGeneral(['pageRepo', pageKey], {
                    diagramXY: {
                        x: e.pageX - pageX + offsetX,
                        y: e.pageY - pageY + offsetY,
                    }
                })
            //if item has not moved, count as user click
            } else {
                props.showModal(modalType.showPage, {
                    pageKey,
                    modeKey,
                    path: ['pageRepo', pageKey],
                    updateSource: updateSourceType.repo,
                })
            }

            //reset
            setSelected(false)

            //remove listeners
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        //add listeners
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    //when the ring is selected, used to create pointer manually
    const onRing = (e) => {
        //save initial coordinates
        const { pageX, pageY, nativeEvent } = e
        const diffX = pageX - offsetX - nativeEvent.offsetX - PHASE_DIAGRAM_ITEM.borderThickness,
              diffY = pageY - offsetY - nativeEvent.offsetY - PHASE_DIAGRAM_ITEM.borderThickness;

        //create listeners
        const onMouseMove = (e) => {
            setPointer({
                from: pageKey,
                fromX: offsetX + PHASE_DIAGRAM_ITEM.outerDiameter/2,
                fromY: offsetY + PHASE_DIAGRAM_ITEM.outerDiameter/2,
                toX: e.pageX - diffX,
                toY: e.pageY - diffY,
            })
        }
        const onMouseUp = (e) => {
            const result = isChildOf(e.target, 'diagram-container')
            if (!!result) {
                const resultKey = result.getAttribute('page-key')
                if (resultKey !== pageKey) {
                    props.connectPhases(pageKey, resultKey)
                }
            }
            
            //return to initial state
            setPointer({})

            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        //add listeners
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    return (
        <div
            className="diagram-container"
            page-key={pageKey}
            style={{
                zIndex: selected ? 2 : 1,
                boxShadow: selected && 'rgba(15, 15, 15, 0.2) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 2px 4px 2px',
                height: PHASE_DIAGRAM_ITEM.outerDiameter,
                width: PHASE_DIAGRAM_ITEM.outerDiameter,
                borderRadius: PHASE_DIAGRAM_ITEM.outerDiameter/2,
                overflow: 'hidden',
                transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
        >
            <Body
                className="diagram-label" bg="charcoal" y="c"
                style={{
                    boxShadow: selected && 'rgba(15, 15, 15, 0.2) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 2px 4px 2px',
                    height: PHASE_DIAGRAM_ITEM.itemHeight,
                    width: PHASE_DIAGRAM_ITEM.itemWidth,
                    top: PHASE_DIAGRAM_ITEM.outerDiameter/2 - PHASE_DIAGRAM_ITEM.itemHeight/2,
                    left: PHASE_DIAGRAM_ITEM.outerDiameter/2 - PHASE_DIAGRAM_ITEM.itemWidth/2,
                }}
            >
                <Text color={title ? "lightgrey" : "darkgrey"} size="l" align="c">
                    {title || 'Untitled'}
                </Text>
            </Body>
            <div
                className="diagram-ring"
                onMouseDown={onRing}
                style={{
                    position: 'absolute',
                    height: PHASE_DIAGRAM_ITEM.outerDiameter,
                    width: PHASE_DIAGRAM_ITEM.outerDiameter,
                    borderRadius: PHASE_DIAGRAM_ITEM.outerDiameter/2,
                    top: 0,
                    left: 0,
                    borderWidth: PHASE_DIAGRAM_ITEM.borderThickness,
                    borderStyle: 'solid',
                }}
            />
            <div
                onMouseDown={onBody}
                style={{
                    position: 'absolute',
                    height: PHASE_DIAGRAM_ITEM.innerDiameter,
                    width: PHASE_DIAGRAM_ITEM.innerDiameter,
                    borderRadius: PHASE_DIAGRAM_ITEM.innerDiameter/2,
                    top: PHASE_DIAGRAM_ITEM.borderThickness,
                    left: PHASE_DIAGRAM_ITEM.borderThickness,
                }}
            />
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
        updateGeneral,
        connectPhases,
    }
)(PhaseDiagramItem)