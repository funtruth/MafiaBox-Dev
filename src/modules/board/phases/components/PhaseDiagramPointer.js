import React from 'react'

import { PHASE_DIAGRAM_ITEM } from '../Constants';

export default function PhaseDiagramPointer({toX, toY, fromX, fromY}) {
    if (!toX) return null

    const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)),
        theta = Math.atan2(toY - fromY, toX - fromX),
        offsetX = Math.cos(theta) * (PHASE_DIAGRAM_ITEM.outerDiameter - PHASE_DIAGRAM_ITEM.borderThickness)/2,
        offsetY = Math.sin(theta) * (PHASE_DIAGRAM_ITEM.outerDiameter - PHASE_DIAGRAM_ITEM.borderThickness)/2;
    
    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 2,
                top: fromY + offsetY - PHASE_DIAGRAM_ITEM.arrowThickness/2,
                left: fromX + offsetX,
                height: PHASE_DIAGRAM_ITEM.arrowThickness,
                width: length - PHASE_DIAGRAM_ITEM.outerDiameter/2,
                backgroundColor: '#fff',
                transform: `rotate(${theta}rad)`,
                transformOrigin: 'left center',
            }}
        >
        </div>
    )
}