import {facebookProvider, firebaseAuth, firebaseDatabase, googleProvider} from '../utils/firebase'
import {nodes} from "../utils/dataBaseNodes";
import {routes} from "../utils/routes";

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
                    item['.key'] = childSnapshot.key;
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
    };

    static onAuthChange = (callbackLogin, callbackLogout) => {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (!authUser) {
                callbackLogout(authUser);
            } else {
                callbackLogin(authUser);
            }
        });

    };

    static loginWithFacebook = () => {
        return firebaseAuth.signInWithPopup(facebookProvider);
    };

    static loginWithGoogle = () => {
        return firebaseAuth.signInWithPopup(googleProvider);
    };

    static writeDataUser = (id, name, email, node) => {
        return firebaseDatabase.ref(node.key + '/' + id).set({
            displayName: name,
            email: email
        });
    };

    static writeData = (id, obj, node) => {
        return firebaseDatabase.ref(node.key + '/' + id).set({...obj});
    };

    static createUser = (email, password) => {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    //TODO extract this two methods createUserAndAddToDataBase and createUserByGoogleAndAddToDataBase to only one.
    static createUserAndAddToDataBase = (email, password, name, addMessage, redirect) => {
        return FirebaseService.createUser(email, password)
            .then(user => {
                const displayName = !!user ? user.displayName : name;
                FirebaseService.writeDataUser(user.uid, displayName, user.email, nodes.users);
                addMessage(`The user ${user.email} has been successfully created.`)
                redirect(routes.welcome)
            })
            .catch((error) => {
                console.log(error);
                addMessage(error.message);
                redirect(routes.newUser);
            });
    };

    static createUserByGoogleAndAddToDataBase = (addMessage, redirect) => {
        return FirebaseService.loginWithGoogle()
            .then(response => {
                let user = response.user;
                FirebaseService.writeDataUser(user.uid, user.displayName, user.email, nodes.users);
                addMessage(`The user ${response.email} has been successfully created.`)
                redirect(routes.welcome)
            })
            .catch((error) => {
                console.log(error);
                addMessage(error.message);
                redirect(routes.newUser);
            });
    };


    static remove = (id, node, addMessage) => {
        return firebaseDatabase.ref(node.key + '/' + id)
            .remove((error) => {
                addMessage(!!error ? error.message : `The ${node.name} with id ${id} was removed successfully`)
            });
    };

    static getUniqueDataBy = (node, callback) => {
        return callback({displayName: 'Teste', email: 'test', id: 'asdasdqwe12dasdasd'});
    }
}
