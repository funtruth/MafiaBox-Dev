import React, { useState, useEffect, useRef } from 'react'

const THRESHOLD = 40

export default function Dropdown(props) {
    const { children, index, position } = props
    const { place, pageX, pageY, sourceHeight, sourceWidth } = position

    const [styles, setStyles] = useState({ display: 'none' })

    const dropdownRef = useRef(null);
    useEffect(() => {
        const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = dropdownRef.current
        
        if (index === 0) {
            const xRightOverflow = window.innerWidth - THRESHOLD < offsetWidth + offsetLeft
            const xLeftOverflow = offsetLeft < 0
            const yBottomOverflow = window.innerHeight - THRESHOLD < offsetHeight + offsetTop
            const yTopOverflow = offsetTop < 0

            switch(place) {
                case "down":
                    if (xRightOverflow || yBottomOverflow) {
                        setStyles({
                            right: xRightOverflow && THRESHOLD,
                            left: !xRightOverflow && pageX,
                            top: yBottomOverflow ? (pageY - sourceHeight - offsetHeight) : pageY,
                        })
                    } else {
                        setStyles({
                            left: pageX,
                            top: pageY,
                        })
                    }
                    break
                case "up":
                case "left":
                    console.warn('functionality is not available yet')
                    break
                case "right":
                    if (window.innerHeight - THRESHOLD < offsetHeight + offsetTop) {
                        setStyles({
                            left: xRightOverflow ? (pageX - sourceWidth - offsetWidth) : pageX,
                            bottom: yBottomOverflow && THRESHOLD,
                        })
                    } else {
                        setStyles({
                            left: pageX + sourceWidth + 8,
                            top: pageY - sourceHeight - 8,
                        })
                    }
                    break
                default:
            }
        } else {
            if (window.innerWidth - THRESHOLD < offsetWidth + offsetLeft) {
                setStyles({
                    left: pageX - sourceWidth - offsetWidth,
                    top: pageY,
                })
            } else if (window.innerHeight - THRESHOLD < offsetHeight + offsetTop) {
                setStyles({
                    left: pageX,
                    top: pageY - sourceHeight - offsetHeight,
                })
            } else {
                setStyles({
                    left: pageX,
                    top: pageY,
                })
            }
        }
            
    }, [dropdownRef.current])
    
    return (
        <div
            ref={dropdownRef}
            className="drop-down-menu" 
            style={styles}
        >
            {children}
        </div>
    )
}