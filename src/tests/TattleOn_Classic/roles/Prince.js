import { fillArrWithIncrInt } from "../../telpers";
import resolveTest from '../../resolveTest'
import { GLOBAL_TEAM_EVIL, GLOBAL_HIDDEN_EVIL, PRINCE } from "../Constants";
import { generateString } from "../../generate";

export default (({ss, results}) => {
    const PAGE = PRINCE
    if (!ss.pageRepo[PAGE]) return results.errors.push('test failed, PAGE not found.');

    const info = ss.pageRepo[PAGE]

    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Prince: default',
        qty: 5,
        playerParams: [
            {x: fillArrWithIncrInt(3), p: 'roleTeam', v: GLOBAL_TEAM_EVIL}
        ],
        logic: info.roleSecrets,
        expectedReturn: `You know ${generateString(3)} are evil.`,
        results
    })
    
    resolveTest({
        key: PAGE,
        testId: 'TattleOn.Classic.Prince: hide_sneak',
        qty: 5,
        playerParams: [
            {x: fillArrWithIncrInt(3), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
            {x: fillArrWithIncrInt(1, 3), p: 'roleTeam', v: GLOBAL_TEAM_EVIL},
            {x: fillArrWithIncrInt(1, 3), p: GLOBAL_HIDDEN_EVIL, v: true}
        ],
        logic: info.roleSecrets,
        expectedReturn: `You know ${generateString(3)} are evil.`,
        results
    })
})