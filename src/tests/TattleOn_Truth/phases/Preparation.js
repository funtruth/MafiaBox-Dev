import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'
import { PREPARATION, MORNING, GLOBAL_READY, GLOBAL_INVESTIGATOR } from "../Constants";

export default (({ss, results}) => {
    const PAGE = PREPARATION
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    for (var i=min; i<=max; i++) {
        for (var j=0; j<i; j++) {
            resolveTest({
                key: PAGE,
                testId: 'TattleOn.Truth.Preparation: do_nothing',
                qty: i,
                choiceParams: [
                    {x: fillArrWithIncrInt(j), p: 'user'},
                    {x: fillArrWithIncrInt(j), p: 'value', v: GLOBAL_READY}
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
            testId: 'TattleOn.Truth.Preparation: next_phase',
            qty: i,
            choiceParams: [
                {x: fillArrWithIncrInt(i), p: 'user'},
                {x: fillArrWithIncrInt(i), p: 'value', v: GLOBAL_READY}
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': MORNING,
                    [`players/a/${GLOBAL_INVESTIGATOR}`]: true,
                    'players/a/featured': false,
                    'players/b/featured': true
                },
                time: 0
            },
            expectedChance: i,
            results
        })
    }
})