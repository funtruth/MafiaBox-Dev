import _ from 'lodash'

const PHASE_STRING  = '(rss)(gameState)(phase)'
const START_STRING  = `"value":"`
const END_STRING    = `"`

//gets the phases of a mode & returns an array of all the phase transitions
export function parsePhaseArrows(items, repo) {
    const arrows = []
    
    for (var j=0; j<items.length; j++) {
        const item = items[j]
        const parts = JSON.stringify(item).split(PHASE_STRING)
        
        if (parts.length > 1) {
            for (var i=1; i<parts.length; i++) {
                const startIndex = parts[i].indexOf(START_STRING) + START_STRING.length
                const endIndex = parts[i].substr(startIndex).indexOf(END_STRING)
                const pageKey = parts[i].substr(startIndex, endIndex)

                if (!repo[pageKey]) continue
                
                arrows.push({
                    from: item,
                    to: repo[pageKey],
                })
            }
        } 
    }
    
    return arrows
}

//produce the array [min, min+1, ... max-1, max]
export function minMaxArray({min, max}) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        console.warn('invalid arguments.')
        return [];
    }

    if (max <= min) {
        console.warn('2nd argument should be greater than first argument')
        return [];
    }

    const array = [];
    for (var i=min; i<=max; i++) {
        array.push(i)
    }
    return array;
}

export function countRoles(roles) {
    let count = 0;
    for (var key in roles) {
        count += roles[key]
    }
    return count;
}

// looks for PHASE_STRING and returns an array of possible phases to transition to
export function parsePhaseListener(listener) {
    const phases = []

    if (!listener) return phases

    const parts = JSON.stringify(listener).split(PHASE_STRING)
    
    if (parts.length > 1) {
        for (var i=1; i<parts.length; i++) {
            const startIndex = parts[i].indexOf(START_STRING) + START_STRING.length
            const endIndex = parts[i].substr(startIndex).indexOf(END_STRING)
            const pageKey = parts[i].substr(startIndex, endIndex)
            
            phases.push(pageKey)
        }
    }

    return _.uniq(phases)
}

// generate a map of all phases that can be reached FROM phase
// does not include phases that can GO to phase
export function getAllPhases({repo, phase, arr = []}) {
    let allPhases = _.cloneDeep(arr)

    const pageInfo = repo && repo[phase]
    if (!pageInfo) return allPhases

    const results = parsePhaseListener(pageInfo.phaseListener)
    let newResults = _.difference(results, arr)
    allPhases = allPhases.concat(newResults)

    for (var i=0; i<newResults.length; i++) {
        allPhases = getAllPhases({
            repo,
            phase: newResults[i],
            arr: allPhases,
        })
    }

    return allPhases
}