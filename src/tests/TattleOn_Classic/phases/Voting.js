import { fillArrWithIncrInt, majority } from "../../telpers";
import resolveTest from '../../resolveTest'
import { GLOBAL_AGREE, GLOBAL_DISAGREE, VOTING, NIGHT, MORNING, GLOBAL_ON_TEAM } from "../Constants";

export default (({ss, results}) => {
    const PAGE = VOTING
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    for (var i=min; i<=max; i++) {
        for (var j=0; j<i; j++) {
            for (var k=0; k<i-j; k++) {
                resolveTest({
                    key: PAGE,
                    testId: 'TattleOn.Classic.Voting: do_nothing',
                    qty: i,
                    choiceParams: [
                        {x: fillArrWithIncrInt(j), p: 'user'},
                        {x: fillArrWithIncrInt(j), p: 'value', v: GLOBAL_AGREE},
                        {x: fillArrWithIncrInt(k, j), p: 'user'},
                        {x: fillArrWithIncrInt(k, j), p: 'value', v: GLOBAL_DISAGREE}
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
        
        const mjty = majority(i)

        //TODO need to add message
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Voting: continue_to_night',
            qty: i,
            choiceParams: [
                {x: fillArrWithIncrInt(mjty), p: 'user'},
                {x: fillArrWithIncrInt(mjty), p: 'value', v: GLOBAL_AGREE},
                {x: fillArrWithIncrInt(i - mjty, mjty), p: 'user'},
                {x: fillArrWithIncrInt(i - mjty, mjty), p: 'value', v: GLOBAL_DISAGREE}
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': NIGHT
                },
                time: 0
            },
            results
        })
        
        //TODO need to add message
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Voting: back_to_morning',
            qty: i,
            playerParams: [
                {x: fillArrWithIncrInt(2), p: GLOBAL_ON_TEAM, v: true},
            ],
            choiceParams: [
                {x: fillArrWithIncrInt(1), p: 'user'},
                {x: fillArrWithIncrInt(1), p: 'value', v: GLOBAL_AGREE},
                {x: fillArrWithIncrInt(i - 1, 1), p: 'user'},
                {x: fillArrWithIncrInt(i - 1, 1), p: 'value', v: GLOBAL_DISAGREE}
            ],
            gameState: {
                veto: 0
            },
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': MORNING,
                    'gameState/veto': 1,
                    [`players/a/${GLOBAL_ON_TEAM}`]: false,
                    [`players/b/${GLOBAL_ON_TEAM}`]: false
                },
                time: 0
            },
            results
        })
    }
})