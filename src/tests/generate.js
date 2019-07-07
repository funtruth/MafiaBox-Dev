//up to 26 players
const UIDS = 'abcdefghijklmnopqrstuvwxyz'

/*
    qty: number
    playerParams: array, contains an infinite amount of properties and the players to apply them to
        {
            x (indeX): array, contains indexes of players that the property will be set to
            p (Property): string,
            v (Value): number | boolean | string
        },...

    example INPUT:
        qty = 3,
        playerParams = [
            {
                x: [1, 3],
                p: 'test',
                v: true
            },
            {
                x: [2],
                p: 'test',
                v: false
            }
        ]
    example OUTPUT:
        {
            a: {
                uid: 'a',
                joinedAt: 0,
                name 'player-a',
                test: true
            },
            b: {
                uid: 'b',
                joinedAt: 0,
                name 'player-b',
                test: false
            },
            c: {
                uid: 'c',
                joinedAt: 0,
                name 'player-c',
                test: true
            }
        }
*/

const validate = (qty, params) => {
    params.forEach(param => {
        if (!param.x || !param.p) {
            console.warn('invalid generation', {qty, params})
            return false;
        }

        param.x.forEach(x => {
            if (x > qty) {
                console.warn('index is greater than QTY', {qty, params})
                return false;
            }
        })
    })

    return true
}

export function generateString(n, m = 0) {
    var foo = [];

    if (!n) return foo;

    for (var i=m; i<n+m; i++) {
        foo.push('player-' + UIDS.charAt(i));
    }
    
    return foo.join(' , ')
}

export function generateRSS({qty, playerParams = [], choiceParams = [], gameState = {}}) {
    let rss = {
        players: {},
        choices: {},
        gameState,
    }

    if (qty > UIDS.length) {
        console.warn('QTY is higher than allowed.', qty)
        return rss;
    }

    //validate playerParams
    if (!validate(qty, playerParams) || !validate(qty, choiceParams)) {
        return rss;
    }

    for (var i=0; i<qty; i++) {
        const uid = UIDS.charAt(i)

        rss.players[uid] = {
            uid,
            joinedAt: i,
            name: 'player-' + uid
        }

        rss.choices[uid] = {
            value: "",
            user: "",
            target: "",
            ordered: "",
            multi: "",
        }

        for (var j=0; j<playerParams.length; j++) {
            const param = playerParams[j]
            if (param.x.indexOf(i) !== -1) {
                rss.players[uid][param.p] = param.v
            }
        }
        
        for (j=0; j<choiceParams.length; j++) {
            const param = choiceParams[j]
            if (param.x.indexOf(i) !== -1) {
                if (param.p === 'user') {
                    rss.choices[uid][param.p] = uid
                } else {
                    rss.choices[uid][param.p] = param.v
                }
            }
        }
    }

    return rss
}