import TattleOn_Classic_test from './TattleOn_Classic/TattleOn_Classic'

export default async () => {
    const results = {
        errors: [],
        byId: {},
    }
    
    await TattleOn_Classic_test(results);

    if (results.errors.length === 0) {
        console.log('all tests passed!', {tests: results.byId})
    } else {
        console.log('some tests failed.', {tests: results.byId})
        results.errors.forEach(error => console.warn(error))
    }
}