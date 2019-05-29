import { convertString } from '../../logic/LogicEngine'

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