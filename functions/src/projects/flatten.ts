import * as admin from 'firebase-admin';
import { EventContext, Change } from "firebase-functions";

export async function onProjectMemberChange(change:Change<any>, event:EventContext) {
    //userProjects path
    const { params } = event
    const { projectKey, uid } = params

    //updates
    const afterVal = change.after.val()
    
    return admin.database().ref(`userProjects/${uid}/${projectKey}`).update(afterVal)
}