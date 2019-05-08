const PHASE_STRING  = '(rss)(gameState)(phase)'
const START_STRING  = `"value":"`
const END_STRING    = `"`

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