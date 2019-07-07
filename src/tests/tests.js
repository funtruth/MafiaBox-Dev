import TattleOn_Classic_test from './TattleOn_Classic/TattleOn_Classic'

export default async () => {
    const errors = [];
    
    await TattleOn_Classic_test(errors);

    if (errors.length === 0) {
        console.log('all tests passed!')
    } else {
        errors.forEach(error => console.warn(error))
    }
}