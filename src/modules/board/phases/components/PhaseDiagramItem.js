import React, { useState } from 'react'

function PhaseDiagramItem(props) {
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)

    const onMouseDown = (e) => {
        const { pageX, pageY } = e
        const onDrag = (e) => {
            setOffsetX(e.pageX - pageX + offsetX)
            setOffsetY(e.pageY - pageY + offsetY)
        }

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onDrag)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onDrag)
        window.addEventListener('mouseup', onMouseUp)
    }

    return (
        <div
            onMouseDown={onMouseDown}
            style={{
                height: 80,
                width: 120,
                backgroundColor: 'red',
                transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
        >
            hihihi
        </div>
    )
}

export default PhaseDiagramItem