import firebase from 'firebase/app'

import preparation_test from './phases/Preparation'
import morning_tests from './phases/Morning'
import voting_tests from './phases/Voting'
import night_tests from './phases/Night'
import assassinate_tests from './phases/Assassinate'

import thug_tests from './roles/Thug'

const PROJECT = 'project-LhvjJuQsu86vO'
const MODE = 'modes-Lhw9BoPhZ0csT'

async function run_tests(results) {
    const ref = firebase.database().ref(`projectsLive/${PROJECT}/modes/${MODE}`)
    const snap = await ref.once('value')
    const ss = snap.val()

    if (!ss.playerNum) return results.errors.push('playerNum not found.');
    if (!ss.pageRepo)  return results.errors.push('pageRepo not found.');

    preparation_test({ss, results});
    morning_tests({ss, results});
    voting_tests({ss, results});
    night_tests({ss, results});
    assassinate_tests({ss, results});

    thug_tests({ss, results});
}

export default run_tests