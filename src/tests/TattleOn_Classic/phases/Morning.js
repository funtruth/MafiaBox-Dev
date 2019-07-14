import { fillArrWithIncrInt, majority } from "../../telpers";
import resolveTest from '../../resolveTest'
import { MORNING, VOTING, GLOBAL_FEATURED, GLOBAL_ON_TEAM, GLOBAL_VETO } from "../Constants";

export default (({ss, results}) => {
    const PAGE = MORNING
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    //description tests

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Morning: description',
        qty: 5,
        playerParams: [
            {x: [0], p: GLOBAL_FEATURED, v: true},
        ],
        gameState: {
            mission: 1,
            failedMissions: 2,
            veto: 0
        },
        logic: info.description,
        expectedReturn: `Leader: player-a\nMission: 1\nFailed Missions: 2\nRejected Teams: 0\n1 player must sabotage this mission for it to fail.`,
        results
    })
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Morning: description',
        qty: 7,
        playerParams: [
            {x: [0], p: GLOBAL_FEATURED, v: true},
        ],
        gameState: {
            mission: 4,
            failedMissions: 2,
            veto: 0
        },
        logic: info.description,
        expectedReturn: `Leader: player-a\nMission: 4\nFailed Missions: 2\nRejected Teams: 0\n2 players must sabotage this mission for it to fail.`,
        results
    })

    //listener tests

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Morning: pick_team',
        qty: 5,
        playerParams: [
            {x: [0], p: GLOBAL_FEATURED, v: true}
        ],
        choiceParams: [
            {x: [0], p: 'user'},
            {x: [0], p: 'multi', v: {a: true, b: true}}
        ],
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': VOTING,
                'players/a/featured': false,
                'players/b/featured': true,
                [`players/a/${GLOBAL_ON_TEAM}`]: true,
                [`players/b/${GLOBAL_ON_TEAM}`]: true
            },
            time: 0
        },
        results
    })

    for (var i=min; i<=max; i++) {
        const mjty = majority(i)
        
        for (var j=1; j<mjty; j++) {
            resolveTest({
                key: PAGE,
                testId: 'TattleOn.Classic.Morning: do_nothing',
                qty: i,
                playerParams: [
                    {x: [0], p: GLOBAL_FEATURED, v: true}
                ],
                choiceParams: [
                    {x: fillArrWithIncrInt(j, 1), p: 'user'},
                    {x: fillArrWithIncrInt(j, 1), p: 'value', v: GLOBAL_VETO}
                ],
                logic: info.phaseListener,
                expectedNext: {
                    update: {},
                    time: 0
                },
                results
            })
        }

        for (j=mjty; j<i; j++) {
            resolveTest({
                key: PAGE,
                testId: 'TattleOn.Classic.Morning: veto_leader',
                qty: i,
                playerParams: [
                    {x: [0], p: GLOBAL_FEATURED, v: true}
                ],
                choiceParams: [
                    {x: fillArrWithIncrInt(j, 1), p: 'user'},
                    {x: fillArrWithIncrInt(j, 1), p: 'value', v: GLOBAL_VETO}
                ],
                gameState: {
                    veto: 0
                },
                logic: info.phaseListener,
                expectedNext: {
                    update: {
                        'gameState/veto': 1,
                        'players/a/featured': false,
                        'players/b/featured': true,
                        'events/0': {
                            showTo: {},
                            hideFrom: {},
                            message: "The current leader was forced to skip their turn by popular vote."
                        }
                    },
                    time: 1
                },
                results
            })
        }
    }
})