import {firebaseAuth, firebaseDatabase} from '../utils/firebase'

export class FirebaseService {
    static getAllDataBy = (rootNode, callback, size = 10, flatMap, orderByChild) => {
        let query = orderByChild != null
            ? firebaseDatabase.ref(rootNode.key).limitToLast(size).orderByChild(orderByChild.key)
            : firebaseDatabase.ref(rootNode.key).limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];

            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();

                const flatMapItem = flatMap(item);

                //TODO: flatMap only works with an array of arrays
                if (flatMapItem instanceof Array) {
                    flatMap(item).forEach(itemInput => {
                        items.push(itemInput);
                    });
                } else {
                    items.push(flatMapItem);
                }
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
