import { fillArrWithIncrInt, majority } from "../../telpers";
import resolveTest from '../../resolveTest'
import { EVIL_WINS, TOWN_WINS, ASSASSINATE, GLOBAL_PRINCE_LIKE, GLOBAL_TEAM_EVIL } from "../Constants";

export default (({ss, results}) => {
    const PAGE = ASSASSINATE
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    for (var i=min; i<=max; i++) {
        const mnty = i - majority(i)
        
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Assassinate: do_nothing',
            qty: i,
            playerParams: [
                {x: fillArrWithIncrInt(mnty), p: 'user'},
                {x: fillArrWithIncrInt(mnty), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
            ],
            choiceParams: [
                {x: fillArrWithIncrInt(i), p: 'user'},
                {x: fillArrWithIncrInt(mnty - 1), p: 'target', v: 'a'},
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {},
                time: 0
            },
            results
        })
    }
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Assassinate: king_not_killed',
        qty: 7,
        playerParams: [
            {x: fillArrWithIncrInt(1), p: GLOBAL_PRINCE_LIKE, v: true},
            {x: fillArrWithIncrInt(3, 2), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(3, 2), p: 'user'},
            {x: fillArrWithIncrInt(3, 2), p: 'target', v: 'b'},
        ],
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': TOWN_WINS,
            },
            time: 0
        },
        results
    })
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Assassinate: king_killed',
        qty: 7,
        playerParams: [
            {x: fillArrWithIncrInt(1), p: GLOBAL_PRINCE_LIKE, v: true},
            {x: fillArrWithIncrInt(3, 1), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(3, 1), p: 'user'},
            {x: fillArrWithIncrInt(3, 1), p: 'target', v: 'a'},
        ],
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': EVIL_WINS,
            },
            time: 0
        },
        results
    })
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Assassinate: no_majority',
        qty: 7,
        playerParams: [
            {x: fillArrWithIncrInt(1), p: GLOBAL_PRINCE_LIKE, v: true},
            {x: fillArrWithIncrInt(3, 1), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
        ],
        choiceParams: [
            {x: fillArrWithIncrInt(3, 1), p: 'user'},
            {x: fillArrWithIncrInt(1, 1), p: 'target', v: 'a'},
            {x: fillArrWithIncrInt(1, 2), p: 'target', v: 'b'},
            {x: fillArrWithIncrInt(1, 3), p: 'target', v: 'c'},
        ],
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'events/0': {
                    showTo: {},
                    hideFrom: {},
                    message: `There must be a majority to continue.`
                },
            },
            time: 1
        },
        results
    })
})