import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'
import { GLOBAL_PRINCE_LIKE, SHERIFF } from "../Constants";

export default (({ss, results}) => {
    const PAGE = SHERIFF
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const info = ss.pageRepo[PAGE]

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Sheriff: default',
        qty: 5,
        playerParams: [
            {x: fillArrWithIncrInt(2), p: GLOBAL_PRINCE_LIKE, v: true}
        ],
        logic: info.roleSecrets,
        expectedReturn: 'After thorough investigation, player-a and player-b both seem like Princes.',
        results
    })
})