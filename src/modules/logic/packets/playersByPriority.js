//proof of concept for sorting players by a property

//tests
let players = {
    a: {
        roleAction: `() => {console.log('player a')}`,
        priority: 2,
    },
    b: {
        roleAction: `() => {console.log('player b')}`,
        priority: 2,
    },
    c: {
        roleAction: `() => {console.log('player c')}`,
        priority: 3,
    },
    d: {
        roleAction: `() => {console.log('player d')}`,
        priority: 50,
    },
    e: {
        roleAction: `() => {console.log('player e')}`,
        priority: 4,
    }
}

function next() {
    let currentPriority = 0,
        nextPriority = 1
        loopCounter = 0;//testing variable

    while (nextPriority > currentPriority) {
        loopCounter++//testing variable
        currentPriority = nextPriority

        for (var p in players) {
            if (players[p].priority === currentPriority) {
                Function(`return ${players[p].roleAction}`)()()
            } else if (players[p].priority > currentPriority) {
                if (players[p].priority < nextPriority) {
                    nextPriority = players[p].priority
                } else if (currentPriority === nextPriority) {
                    nextPriority = players[p].priority
                }
            }
        }
    }

    console.log(`looped ${loopCounter} times.`)
}
  
next()