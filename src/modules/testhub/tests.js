export const LOGIC_TESTS = [
    {
        rss: {
            players: {
                '123': {
                    dead: false,
                },
                '124': {
                    dead: false,
                },
                '125': {
                    dead: false,
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
        next: {
            update: {},
            time: 123,
        },
    }
]