import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

import {
    onProjectMemberChange,
} from './projects/flatten'

/* Flattening functions
    functions used to ensure that data is consistent at multiple locations
*/
exports.onProjectMemberChange = functions.database.ref('projects/{projectKey}/members/{uid}')
    .onUpdate((change, event) => onProjectMemberChange(change, event))