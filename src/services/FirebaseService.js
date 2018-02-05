import {firebaseAuth, firebaseDatabase} from '../utils/firebase'
import {nodes} from "../utils/dataBaseNodes";

export class FirebaseService {
    static getAllDataBy = (rootNode, callback, size) => {
        firebaseDatabase.ref(rootNode)
            .limitToLast(size)
            .orderByChild(nodes.client)
            .on('value', dataSnapshot => {
                let items = [];

                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    items.push(item);
                });

                callback(items);
            });
    };

    static login = (email, password) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    };

    static logout = () => {
        return firebaseAuth.signOut();
    }
}
