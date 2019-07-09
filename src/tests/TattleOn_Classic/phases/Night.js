import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'
import { MORNING, NIGHT, EVIL_WINS, ASSASSINATE, GLOBAL_SUCCESS, GLOBAL_FAIL, GLOBAL_ON_TEAM } from "../Constants";

export default (({ss, results}) => {
    const PAGE = NIGHT
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Night: do_nothing',
        qty: 6,
        playerParams: [
            {x: fillArrWithIncrInt(3), p: GLOBAL_ON_TEAM, v: true}
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(2), p: 'user'},
            {x: fillArrWithIncrInt(2), p: 'value', v: GLOBAL_FAIL},
        ],
        logic: info.phaseListener,
        expectedNext: {
            update: {},
            time: 0
        },
        results
    })

    for (var i=min; i<=max; i++) {
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Night: mission_success',
            qty: i,
            playerParams: [
                {x: fillArrWithIncrInt(3), p: GLOBAL_ON_TEAM, v: true}
            ],
            choiceParams: [
                {x: fillArrWithIncrInt(3), p: 'user'},
                {x: fillArrWithIncrInt(3), p: 'value', v: GLOBAL_SUCCESS}
            ],
            gameState: {
                mission: 2,
                failedMissions: 0
            },
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': MORNING,
                    'gameState/mission': 3,
                    'events/0': {
                        showTo: {},
                        hideFrom: {},
                        message: `The town was guarded safely last night! 0 member(s) failed to protect the town.`
                    }
                },
                time: 1
            },
            results
        })
        
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Night: mission_failed',
            qty: i,
            playerParams: [
                {x: fillArrWithIncrInt(3), p: GLOBAL_ON_TEAM, v: true}
            ],
            choiceParams: [
                {x: fillArrWithIncrInt(1), p: 'user'},
                {x: fillArrWithIncrInt(1), p: 'value', v: GLOBAL_SUCCESS},
                {x: fillArrWithIncrInt(2, 1), p: 'user'},
                {x: fillArrWithIncrInt(2, 1), p: 'value', v: GLOBAL_FAIL}
            ],
            gameState: {
                mission: 2,
                failedMissions: 0
            },
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': MORNING,
                    'gameState/mission': 3,
                    'gameState/failedMissions': 1,
                    'events/0': {
                        showTo: {},
                        hideFrom: {},
                        message: `The town was not guarded last night. 2 member(s) failed to protect the town.`
                    }
                },
                time: 1
            },
            results
        })
    }

    //Edge cases

    //TODO change message, needs to show if 1 fail
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Night: mission4_success',
        qty: 8,
        playerParams: [
            {x: fillArrWithIncrInt(4), p: GLOBAL_ON_TEAM, v: true}
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(3), p: 'user'},
            {x: fillArrWithIncrInt(3), p: 'value', v: GLOBAL_SUCCESS},
            {x: fillArrWithIncrInt(1, 3), p: 'user'},
            {x: fillArrWithIncrInt(1, 3), p: 'value', v: GLOBAL_FAIL}
        ],
        gameState: {
            mission: 4,
            failedMissions: 2
        },
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': MORNING,
                'gameState/mission': 5,
                'events/0': {
                    showTo: {},
                    hideFrom: {},
                    message: `The town was guarded safely last night! 1 member(s) failed to protect the town.`
                }
            },
            time: 1
        },
        results
    })

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Night: 3_missions_passed_assassinate',
        qty: 6,
        playerParams: [
            {x: fillArrWithIncrInt(3), p: GLOBAL_ON_TEAM, v: true}
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(3), p: 'user'},
            {x: fillArrWithIncrInt(3), p: 'value', v: GLOBAL_SUCCESS},
        ],
        gameState: {
            mission: 3,
            failedMissions: 0
        },
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': ASSASSINATE
            },
            time: 0
        },
        results
    })

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Night: evil_wins',
        qty: 6,
        playerParams: [
            {x: fillArrWithIncrInt(3), p: GLOBAL_ON_TEAM, v: true}
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(1), p: 'user'},
            {x: fillArrWithIncrInt(1), p: 'value', v: GLOBAL_SUCCESS},
            {x: fillArrWithIncrInt(2, 1), p: 'user'},
            {x: fillArrWithIncrInt(2, 1), p: 'value', v: GLOBAL_FAIL}
        ],
        gameState: {
            mission: 3,
            failedMissions: 2
        },
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': EVIL_WINS
            },
            time: 0
        },
        results
    })
})