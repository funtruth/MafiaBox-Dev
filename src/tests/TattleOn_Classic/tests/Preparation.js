import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'

const PAGE = "phases-LhvjMxw9MIUmf"

const GLOBAL_READY = "global-LhvjZfgTveYoY"

export default (({ss, errors}) => {
    if (!ss.pageRepo[PAGE]) return errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

    for (var i=min; i<=max; i++) {
        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Preparation: do_nothing',
            qty: i,
            choiceParams: [
                {x: fillArrWithIncrInt(i - 1), p: 'user'},
                {x: fillArrWithIncrInt(i - 1), p: 'value', v: GLOBAL_READY}
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {},
                time: 0
            },
            errors
        })

        resolveTest({
            key: PAGE,
            testId: 'TattleOn.Classic.Preparation: next_phase',
            qty: i,
            choiceParams: [
                {x: fillArrWithIncrInt(i), p: 'user'},
                {x: fillArrWithIncrInt(i), p: 'value', v: GLOBAL_READY}
            ],
            logic: info.phaseListener,
            expectedNext: {
                update: {
                    'gameState/phase': "phases-Lhvk1YGqB7qLa",
                    'players/a/featured': true
                },
                time: 0
            },
            expectedChance: i,
            errors
        })
    }
})