//proof of concept for finding next player

//tests
let players = {
    a: {
        joinedAt: 4,
    },
    b: {
        joinedAt: 8,
    },
    c: {
        joinedAt: 16,
    },
    d: {
        featured: true,
        joinedAt: 12,
    },
    e: {
        joinedAt: 1,
    }
}

function next() {
    let current,
        currentUid,
        smallest,
        smallestUid,
        next = 0,
        nextUid;

    //find the CURRENT player while finding the LAST player.
    for (var player in players){
        if (players[player].featured) {
            current = players[player].joinedAt
            currentUid = player
        }
        if (players[player].joinedAt > next) {
            next = players[player].joinedAt
            nextUid = player
        }
    }

    //set FIRST player, used in case the CURRENT player is the LAST player
    smallest = current
    smallestUid = currentUid

    for (var p in players){
        //find the FIRST player
        if (players[p].joinedAt < smallest){
            smallest = players[p].joinedAt
            smallestUid = p
        }
        //lower NEXT (which is the LAST player at the start of the loop) player, but not lower than CURRENT (to find the real NEXT)
        if (players[p].joinedAt < next){
            if (players[p].joinedAt > current){
                next = players[p].joinedAt
                nextUid =  p
            }
        }
    }
    
    //if CURRENT was LAST player, restart the cycle at FIRST player
    if (current === next) {
        nextUid = smallestUid
    }
    
    //UPDATES
    players[nextUid].featured = true
    players[currentUid].featured = false
}
  
next()
console.log(players)