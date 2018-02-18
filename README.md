# A React-Redux-Firebase Automatic Boilplate

A react-redux-firebase approach to create apps. Automatize crud creations of CRUDs with easy way to configure app.

[Check here to running example](https://react-redux-firebase-ex.firebaseapp.com)

## Configuration

### Firebase Credentials

Add or Firebase Project info at `src/utils/custom/firebase.js`

```
const config = {
        apiKey: "***************",
        authDomain: "***************",
        databaseURL: "***************",
        projectId: "***************",
        storageBucket: "***************",
        messagingSenderId: "***************"
    };
```

The project has an enviroment verification, then use or config to production at `const prodConfig`;

### Firebase Realtime Database node configuration

Edit the file `src/utils/custom/nodes.js` and add your firebase realtime database node information to auto create the crud page of this node.

```
export const nodes = {
    beautifulMode: {
        name: 'Beautiful',
        key: 'beautiful',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/beautiful',
        pathToEdit: '/edit/beautiful',
        pathToNew: '/new/beautiful',
        keys: [
            {name: 'Client', key: "cliente", type: 'email', required: 'true'},
            {name: 'Date', key: "data", type: 'date', required: 'true'},
            {name: 'Humidity', key: "umidade", type: 'number', required: 'true'},
        ],
        canAddNew: true
    },
    ...
};
```

What this mean:

- `name` : Display name of node, will be displayed at CRUD pages.
- `key` : Firebase Realtime Database node key
- `flat` : A flatMap function (not realy working)
- `orderByChild` : Key of child to order the query of this node
- `pathToMainLink` : Path to list of entries of this node: use `/data/key`.
- `pathToEdit` :Path to edit of entries of this node: use `/edit/key`.
- `pathToNew` : Path to list of entries of this node: use `/new/key`.
- `keys` :  List of childs of this node, ignoring array and obj entries
    - `name` : Display name of child
    - `key` : Firebase Realtime Database child node key
    - `type` : HTML type of input
    - `required` : Blocks input of null or blank infos.
- `canAddNew`: Block input of new entries.

### Env configuration

The project comes with this default env variables:

- `REACT_APP_FACEBOOK_LOGIN_ENABLE`: Enable/Disable Google login
- `REACT_APP_GOOGLE_LOGIN_ENABLE`:  Enable/Disable Facebook login
- `REACT_APP_CAN_CREATE_NEW_USER_OUTSIDE_APP`:  Enable/Disable creation of users at login's page

To add new env variables, add to `.env` file, then add to `/src/utils/envHelper.js`.

# Run
For the first run execute `npm install` or `yarn install`.
To run, execute `npm start` or `yarn start`


# Deploy
Init the project in firebase using: `firebase init`
Run the script `npm run deploy` or `yarn run deploy` to run the deploy in firebase hosting.

#### TODOS

- Google login creates a new user no matter he has or not acess
- Fix table's header on top
- Add user to firebaseAuth when created
- Feature branch using material-ui
- Extract wrappers to HOC
- Keep a record of user is active
- Paginate tables
- Make tests work
- Separate service layer

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
