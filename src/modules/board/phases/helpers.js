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