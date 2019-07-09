import { fillArrWithIncrInt, majority } from "../../telpers";
import resolveTest from '../../resolveTest'
import { GLOBAL_AGREE, GLOBAL_DISAGREE, VOTING, NIGHT, MORNING, GLOBAL_ON_TEAM } from "../Constants";
import { generateString } from "../../generate";

export default (({ss, results}) => {
    const PAGE = VOTING
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    //description tests

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Voting: description',
        qty: 5,
        playerParams: [
            {x: fillArrWithIncrInt(2), p: GLOBAL_ON_TEAM, v: true},
        ],
        logic: info.description,
        expectedReturn: `The leader has chosen ${generateString(2)} to guard the town.`,
        results
    })

    //listener tests

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

        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Voting: continue_to_night_full_agreement',
            qty: i,
            choiceParams: [
                {x: fillArrWithIncrInt(i), p: 'user'},
                {x: fillArrWithIncrInt(i), p: 'value', v: GLOBAL_AGREE},
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': NIGHT,
                    'events/0': {
                        showTo: {},
                        hideFrom: {},
                        message: `Nobody voted against the team.`
                    }
                },
                time: 1
            },
            results
        })

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
                    'gameState/phase': NIGHT,
                    'events/0': {
                        showTo: {},
                        hideFrom: {},
                        message: `The players ${generateString(i - mjty, mjty)} voted against the team.`
                    }
                },
                time: 1
            },
            results
        })
        
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
                    [`players/b/${GLOBAL_ON_TEAM}`]: false,
                    'events/0': {
                        showTo: {},
                        hideFrom: {},
                        message: `The players ${generateString(i - 1, 1)} voted against the team.`
                    }
                },
                time: 1
            },
            results
        })
    }
})