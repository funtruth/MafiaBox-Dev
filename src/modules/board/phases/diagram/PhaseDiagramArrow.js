import React from 'react'

import { PHASE_DIAGRAM_ITEM } from '../Constants';

export default function PhaseDiagramArrow({
    from:   {diagramXY: {x: x1 = 0, y: y1 = 0}},
    to:     {diagramXY: {x: x2 = 0, y: y2 = 0}},
}){
    const length = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)),
        theta = Math.atan2(y2 - y1, x2 - x1),
        offsetX = Math.cos(theta) * (PHASE_DIAGRAM_ITEM.outerDiameter - PHASE_DIAGRAM_ITEM.borderThickness)/2,
        offsetY = Math.sin(theta) * (PHASE_DIAGRAM_ITEM.outerDiameter - PHASE_DIAGRAM_ITEM.borderThickness)/2;
    
    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 2,
                top: y1 + offsetY + PHASE_DIAGRAM_ITEM.outerDiameter/2 - PHASE_DIAGRAM_ITEM.arrowThickness/2,
                left: x1 + offsetX + PHASE_DIAGRAM_ITEM.outerDiameter/2,
                height: PHASE_DIAGRAM_ITEM.arrowThickness,
                width: length - PHASE_DIAGRAM_ITEM.outerDiameter,
                backgroundColor: '#fff',
                transform: `rotate(${theta}rad)`,
                transformOrigin: 'left center',
            }}
        >
        </div>
    )
}