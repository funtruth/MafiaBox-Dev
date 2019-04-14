import React, { useState, useEffect, useRef } from 'react'

const THRESHOLD = 20

export default function Dropdown(props) {
    const { children, index, position, onClick } = props
    const { place, pageX, pageY, sourceHeight, sourceWidth } = position

    //hide dropdown before calculating whether or not it needs to be re-positioned
    const [styles, setStyles] = useState({ display: 'none' })

    const dropdownRef = useRef(null);

    useEffect(() => {
        let { offsetHeight, offsetWidth, offsetTop, offsetLeft } = dropdownRef.current
        
        const rightOverflow = window.innerWidth - THRESHOLD < offsetWidth + offsetLeft
        //const xLeftOverflow = offsetLeft < 0
        const bottomOverflow = window.innerHeight - THRESHOLD < offsetHeight + offsetTop
        //const yTopOverflow = offsetTop < 0

        if (index === 0) {
            switch(place) {
                case "down":
                    if (rightOverflow || bottomOverflow) {
                        setStyles({
                            right: rightOverflow && THRESHOLD,
                            left: !rightOverflow && pageX,
                            top: bottomOverflow ? (pageY - sourceHeight - offsetHeight) : pageY,
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
                    if (rightOverflow) {
                        setStyles({
                            left: rightOverflow ? (pageX - sourceWidth - offsetWidth) : pageX,
                            bottom: bottomOverflow && THRESHOLD,
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
            if (rightOverflow) {
                setStyles({
                    left: pageX - sourceWidth - offsetWidth,
                    top: pageY,
                })
            } else if (bottomOverflow) {
                setStyles({
                    left: pageX,
                    bottom: THRESHOLD,
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
            onClick={() => onClick && onClick()}
        >
            {children}
        </div>
    )
}