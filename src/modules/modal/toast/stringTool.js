import React from 'react'

import { dropdownType } from '../../dropdown/types'

import { convertString } from '../../logic/LogicEngine'

export function braceToHtml(string='') {
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
                const segment = string.slice(startIndex + 1, i)
                
                parts.push(
                    <div
                        key={i}
                        className="app-onclick string-var"
                        menu-type={dropdownType.pickEventVar}
                        app-onclick-props={JSON.stringify({
                            range: {
                                startIndex: startIndex + 1,
                                endIndex: i,
                            },
                            string,
                            currentValue: segment,
                        })}
                    >
                        {segment}
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
    
    return parts.map((i, j) => {
        return (
            typeof i === 'string' ?
                i.replace(/\s/g, ' /123/')
                    .split('/123/')
                    .map((k, l) => {
                        if (k === ' ') return null
                        return <pre key={`${j}-${l}`}>{k}</pre>
                    })
                :i
        )
    })
}

//{$user} to ${user}
export function stringToCode(string) {
    let startIndex = 0
    let leftBraceSaved = false
    let stringCopy = ''
    
    for (var i=0; i<string.length; i++) {
        const char = string.charAt(i)

        if (leftBraceSaved) {
            if (char === '{') {
                stringCopy = stringCopy.concat(string.slice(startIndex, i))
                startIndex = i
            } else if (char === '}') {
                stringCopy = stringCopy.concat(convertString(string.slice(startIndex + 1, i)))
                startIndex = i + 1
                leftBraceSaved = false
            }
        } else {
            if (char === '{') {
                stringCopy = stringCopy.concat(string.slice(startIndex, i))
                startIndex = i
                leftBraceSaved = true
            }
        }
    }

    stringCopy = stringCopy.concat(string.slice(startIndex))
    
    return stringCopy
}