import firebase from 'firebase/app'

class FirebaseService{
    //General
    get(path){
        return firebase.database().ref(path).once('value').then(snap => {
            return snap.val();
        });
    }
    getSnap(path){
        return firebase.database().ref(path).once('value').then(snap => {
            return snap;
        });
    }

    set(path, val) {
        return firebase.database().ref(path).set(val)
    }
    update(path, val) {
        return firebase.database().ref(path).update(val)
    }
}

export default new FirebaseService();