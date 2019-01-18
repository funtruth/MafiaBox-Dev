import React from 'react'

import { dropdownType } from '../dropdown/types'

export function braceToHtml(string) {
    let parts = []
    let startIndex = 0
    let leftBraceSaved = false
    
    for (var i=0; i<string.length; i++) {
        const char = string.charAt(i)

        if (leftBraceSaved) {
            if (char === '{') {
                parts.push(string.slice(startIndex, i))
                startIndex = i
            } else if (char === '}') {
                parts.push(
                    <div
                        key={i}
                        className="app-onclick common-bubble"
                        menu-type={dropdownType}
                        
                    >
                        {string.slice(startIndex + 1, i)}
                    </div>
                )
                startIndex = i + 1
                leftBraceSaved = false
            }
        } else {
            if (char === '{') {
                parts.push(string.slice(startIndex, i))
                startIndex = i
                leftBraceSaved = true
            }
        }
    }

    parts.push(string.slice(startIndex))
    
    return parts
}