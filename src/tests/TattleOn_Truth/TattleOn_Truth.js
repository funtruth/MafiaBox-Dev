import firebase from 'firebase/app'

import preparation_test from './phases/Preparation'
import night_tests from './phases/Night'
import lie_detector_tests from './phases/LieDetector'

const PROJECT = 'project-LhvjJuQsu86vO'
const MODE = "modes-Li_Dc927ZoM8v"

async function run_tests(results) {
    const ref = firebase.database().ref(`projectsLive/${PROJECT}/modes/${MODE}`)
    const snap = await ref.once('value')
    const ss = snap.val()

    if (!ss.playerNum) return results.errors.push('playerNum not found.');
    if (!ss.pageRepo)  return results.errors.push('pageRepo not found.');

    preparation_test({ss, results});
    night_tests({ss, results});
    lie_detector_tests({ss, results});
}

export default run_tests