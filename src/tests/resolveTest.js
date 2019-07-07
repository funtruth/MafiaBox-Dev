import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import generateRSS from "./generateRSS";

export default ({
    key,
    testId,
    qty,
    playerParams,
    choiceParams,
    logic,
    expectedNext,
    expectedReturn,
    expectedChance, //only for expectedNext
    errors
}) => {
    const rss = generateRSS({qty, playerParams, choiceParams})
    const next = {update: {}, time: 0}

    // eslint-disable-next-line
    const actualReturn = Function(`return ${logic}`)()(rss, next)

    if (!isEqual(expectedNext, next) && !expectedChance) {
        errors.push(`${testId}:${key} failed by Expected NEXT at ${qty} players`, {expectedNext, next})
    }

    if (!isEqual(expectedReturn, actualReturn)) {
        errors.push(`${testId}:${key} failed by Expected RETURN at ${qty} players`, {expectedReturn, actualReturn})
    }

    if (expectedChance) {
        let rss = generateRSS({qty, playerParams, choiceParams}),
            nextMatches = 0;

        for (var i=0; i<100*expectedChance; i++) {
            const loopedRss = cloneDeep(rss)
            const loopedNext = {update: {}, time: 0}

            // eslint-disable-next-line
            Function(`return ${logic}`)()(loopedRss, loopedNext)

            if (isEqual(expectedNext, loopedNext)) {
                nextMatches++;
            }
        }

        if (Math.abs(100 - nextMatches) > 30) {
            errors.push(`${testId}:${key} failed by Expected NEXT at ${qty} players`, {expectedNext, next})
        }
    }
}