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
    }
]