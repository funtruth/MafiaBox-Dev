export const LOGIC_TESTS = [
    {
        rss: {
            players: {
                '123': {
                    dead: false,
                    health: 0,
                },
                '124': {
                    dead: false,
                    health: 0,
                },
                '125': {
                    dead: false,
                    health: 0,
                },
            },
            gameState: {
                phase: '',
                counter: '',
            },
            choices: {
                '123': {
                    user: '123',
                    target: '124',
                    value: "guilty",
                },
                '124': {
                    user: '124',
                    target: '124',
                    value: "guilty",
                },
                '125': {
                    user: '125',
                    target: '124',
                    value: "guilty",
                },
            }
        },
        next: {update: {},time: 123},
        expected: {},
    },
    {
        id: "night phase test",
        rss: {
            players: {
                '123': {
                    dead: false,
                    health: 0,
                    roleAction: `(rss, next, player) => {next.update['hi'] = player}`
                },
                '124': {
                    dead: false,
                    health: 0,
                    roleAction: `() => {}`
                },
                '125': {
                    dead: false,
                    health: 0,
                    roleAction: `() => {}`
                },
            },
            gameState: {
                phase: '',
                counter: '',
            },
            choices: {
                '123': {
                    user: '123',
                    target: '124',
                },
                '124': {
                    user: '124',
                    value: "global-Lh1d_RwGABbqL",
                },
                '125': {
                    user: '125',
                    value: "global-Lh1d_RwGABbqL",
                },
            }
        },
        next: {update: {},time: 123},
        expected: {},
    },
    {
        id: "number calculation test",
        index: 2,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{}}, gameState: {mission: 1}},
        expected: 2,
    },
    {
        id: "number calculation test",
        index: 3,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{}}, gameState: {mission: 2}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 4,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{}}, gameState: {mission: 3}},
        expected: 2,
    },
    {
        id: "number calculation test",
        index: 5,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{}}, gameState: {mission: 4}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 6,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{}}, gameState: {mission: 5}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 7,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{}}, gameState: {mission: 1}},
        expected: 2,
    },
    {
        id: "number calculation test",
        index: 8,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{}}, gameState: {mission: 2}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 9,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{}}, gameState: {mission: 3}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 10,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{}}, gameState: {mission: 4}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 11,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{}}, gameState: {mission: 5}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 7,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{}}, gameState: {mission: 1}},
        expected: 2,
    },
    {
        id: "number calculation test",
        index: 8,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{}}, gameState: {mission: 2}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 9,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{}}, gameState: {mission: 3}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 10,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{}}, gameState: {mission: 4}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 11,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{}}, gameState: {mission: 5}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 12,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{}}, gameState: {mission: 1}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 13,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{}}, gameState: {mission: 2}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 14,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{}}, gameState: {mission: 3}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 15,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{}}, gameState: {mission: 4}},
        expected: 5,
    },
    {
        id: "number calculation test",
        index: 16,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{}}, gameState: {mission: 5}},
        expected: 5,
    },
    {
        id: "number calculation test",
        index: 17,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}}, gameState: {mission: 1}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 18,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}}, gameState: {mission: 2}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 19,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}}, gameState: {mission: 3}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 20,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}}, gameState: {mission: 4}},
        expected: 5,
    },
    {
        id: "number calculation test",
        index: 21,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}}, gameState: {mission: 5}},
        expected: 5,
    },
    {
        id: "number calculation test",
        index: 22,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}, 'j':{}}, gameState: {mission: 1}},
        expected: 3,
    },
    {
        id: "number calculation test",
        index: 23,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}, 'j':{}}, gameState: {mission: 2}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 24,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}, 'j':{}}, gameState: {mission: 3}},
        expected: 4,
    },
    {
        id: "number calculation test",
        index: 25,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}, 'j':{}}, gameState: {mission: 4}},
        expected: 5,
    },
    {
        id: "number calculation test",
        index: 26,
        rss: {players: {'a':{},'b':{},'c':{},'d':{},'e':{},'f':{},'g':{},'h':{},'i':{}, 'j':{}}, gameState: {mission: 5}},
        expected: 5,
    },
    {
        id: "starting game, random featured player test",
        index: 32,
        rss: {players:{'a':{},'b':{}}, choices:{'a':{value:"global-LhvjZfgTveYoY"},'b':{value:"global-LhvjZfgTveYoY"}}},
        next: {update: {},time: 123},
        expected: "",
    }
]