import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import { generateRSS } from "./generate";

export default ({
    key,
    testId,
    qty,
    playerParams,
    choiceParams,
    choice,
    gameState,
    logic,
    expectedNext,
    expectedReturn,
    expectedChance, //only for expectedNext
    results
}) => {
    if (!results.byId[key]) {
        results.byId[key] = {
            total: 1,
            data: []
        }
    } else {
        results.byId[key].total++
    }

    const rss = generateRSS({qty, playerParams, choiceParams, gameState})
    const next = {update: {}, time: 0}

    // eslint-disable-next-line
    const actualReturn = Function(`return ${logic}`)()(rss, next, choice)

    if (expectedNext) {
        if (!isEqual(expectedNext, next) && !expectedChance) {
            results.errors.push(`${testId}:${key} failed by Expected NEXT at ${qty} players`, {rss, expectedNext, next})
        }
        results.byId[key].data.push({testId, qty, rss, expectedNext, next})
    }

    if (expectedReturn) {
        if (!isEqual(expectedReturn, actualReturn)) {
            results.errors.push(`${testId}:${key} failed by Expected RETURN at ${qty} players`, {expectedReturn, actualReturn})
        }
        results.byId[key].data.push({testId, qty, rss, expectedReturn, actualReturn})
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
            results.errors.push(`${testId}:${key} failed by Expected NEXT at ${qty} players`, {expectedNext, next})
        }
    }
}