import { rssMap } from '../common/defaults'

export const START_CHAR = '('
export const END_CHAR = ')'
export const WILD_CHAR = '@'

export const START_REGEX = /\(/g
export const END_REGEX = /\)/g

//input => "(rss)(players)((choices)(user))"
//ouput => ["rss", "players", "(choices)(user)"]
export function separateVar(value = "") {
    if (typeof value === 'object') {
        console.warn('object is an invalid value prop.')
        return []
    }
    
    //make sure string is valid
    const a = (value.match(START_REGEX)||[]).length,
          b = (value.match(END_REGEX)||[]).length,
          fields = [];
          
    if (a !== b) {
        console.warn('String should have the same amount of ( and )')
        return [];
    }

    if (a === 0) {
        return [value]
    }

    let counter = 0,
        pointer = 0;

    for (var i=0; i<value.length; i++) {
        const c = value.charAt(i)
        
        if (c === START_CHAR) {
            if(counter === 0) {
                pointer = i + 1;
            }
            counter++;
        } else if (c === END_CHAR) {
            if (counter === 1) {
                fields.push(value.substring(pointer, i))
            }
            counter--;
        }
    }

    return fields;
}

export function searchVarWithMap(value, map = []) {
    const fields = separateVar(value)

    //
    if (map.length === 0) {
        return fields
    }

    //recursive starting at next number in map
    return searchVarWithMap(fields[map[0]], map.slice(1))
}

export function replaceVarWithMap(newValue, oldValue, map = []) {
    const fields = separateVar(oldValue)
    const [removed] = fields.splice(map[0], 1)

    //use splice to insert the new value into the old fields array, replacing "@"
    fields.splice(map[0], 0, map.length === 1 ? newValue : replaceVarWithMap(newValue, removed, map.slice(1)))

    return combineFields(fields)
}

export function concatField(a = "", b = "") {return a + START_CHAR + b + END_CHAR}
export function combineFields(fields=[]) {return START_CHAR + fields.join(END_CHAR + START_CHAR) + END_CHAR}
export function varInStr(v) {return `\${${parseJS(v)}}`}

//returns properties of prefix (foo)(bar) existing in rssMap
export function getSubfields(prefix) {
    const parts = separateVar(prefix),
          fields = [];
          
    for (var key in rssMap) {
        let match = true;
        const otherParts = separateVar(rssMap[key].value)

        //if fieldInfo is a subfield, it's length will be 1 greater than the prefix
        if (otherParts.length !== parts.length + 1) continue

        //compare fieldInfo to the prefix parts, does not need to check the last field of fieldInfo
        for (var i=0; i<parts.length; i++) {
            //if field doesn't match, and field isn't a wildcard, it is not a match
            if (otherParts[i] !== parts[i] && otherParts[i] !== WILD_CHAR) {
                match = false
                break
            }
        }

        if (match) {
            fields.push(rssMap[key])
        }
    }
    
    return fields;
}

//display the variable in proper javascript
//input => (rss)(players)((choices)(user))(dead)
//ouput => rss.players[choices.user].dead
export function parseJS(string = "") {
    const fields = separateVar(string)

    if (!fields.length) {
        return string;
    }
    
    let str = fields[0]

    for (var i=1; i<fields.length; i++) {
        if (fields[i].charAt(0) === START_CHAR && fields[i].charAt(fields[i].length - 1) === END_CHAR) {
            str += '[' + parseJS(fields[i]) +']'
        } else {
            str += '.' + fields[i]
        }
    }
       
    return str
}