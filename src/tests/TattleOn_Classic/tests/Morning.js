import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'

const PAGE = "phases-Lhvk1YGqB7qLa"

const GLOBAL_FEATURED = "featured"
const GLOBAL_VETO = "global-LhvjZfgTveYoY"
const GLOBAL_ON_TEAM = "tag-LhvmpZNdAzxhx"

export default (({ss, errors}) => {
    if (!ss.pageRepo[PAGE]) return errors.push('test failed, PAGE not found.');

    const { min, max } = ss.playerNum
    const info = ss.pageRepo[PAGE]

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
                'gameState/phase': 'phases-Lhvl2tNA5YNx4',
                'players/a/featured': false,
                'players/b/featured': true,
                [`players/a/${GLOBAL_ON_TEAM}`]: true,
                [`players/b/${GLOBAL_ON_TEAM}`]: true
            },
            time: 0
        },
        errors
    })

    for (var i=min; i<=max; i++) {
        
    }
})