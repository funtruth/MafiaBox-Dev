import firebase from 'firebase/app'

import preparation_test from './tests/Preparation'
import morning_tests from './tests/Morning'

const PROJECT = 'project-LhvjJuQsu86vO'
const MODE = 'modes-Lhw9BoPhZ0csT'

async function run_tests(errors) {
    const ref = firebase.database().ref(`projectsLive/${PROJECT}/modes/${MODE}`)
    const snap = await ref.once('value')
    const ss = snap.val()

    if (!ss.playerNum) return errors.push('playerNum not found.');
    if (!ss.pageRepo)  return errors.push('pageRepo not found.');

    preparation_test({ss, errors});
    morning_tests({ss, errors});
}

export default run_tests