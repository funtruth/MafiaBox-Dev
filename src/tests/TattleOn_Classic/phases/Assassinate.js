import { fillArrWithIncrInt, majority } from "../../telpers";
import resolveTest from '../../resolveTest'
import { EVIL_WINS, TOWN_WINS, ASSASSINATE } from "../Constants";

export default (({ss, results}) => {
    const PAGE = ASSASSINATE
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    for (var i=min; i<=max; i++) {
        const mjty = majority(i)
        
        for (var j=1; j<mjty; j++) {
            resolveTest({
                key: PAGE,
                testId: 'TattleOn.Classic.Assassinate: do_nothing',
                qty: i,
                choiceParams: [
                    {x: fillArrWithIncrInt(j, 1), p: 'user'},
                ],
                logic: info.phaseListener,
                expectedNext: {
                    update: {},
                    time: 0
                },
                results
            })
        }
    }
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Assassinate: king_not_killed',
        qty: i,
        choiceParams: [
            {x: fillArrWithIncrInt(j, 1), p: 'user'},
        ],
        gameState: {
            veto: 0
        },
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': TOWN_WINS,
            },
            time: 1
        },
        results
    })
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Assassinate: king_killed',
        qty: i,
        choiceParams: [
            {x: fillArrWithIncrInt(j, 1), p: 'user'},
        ],
        gameState: {
            veto: 0
        },
        logic: info.phaseListener,
        expectedNext: {
            update: {
                'gameState/phase': EVIL_WINS,
            },
            time: 1
        },
        results
    })
})