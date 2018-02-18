export const nodes = {
    leitura: {
        name: 'Data',
        key: 'leitura',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/leitura',
        pathToEdit: '/edit/leitura',
        pathToNew: '/new/leitura',
        keys: [
            {name: 'Client', key: "cliente", type: 'email', required: 'true'},
            {name: 'Date', key: "data", type: 'date', required: 'true'},
            {name: 'Temperature', key: "temperatura", type: 'number', required: 'true'},
            {name: 'Humidity', key: "umidade", type: 'number', required: 'true'},
        ],
        canAddNew: true
    },
    users: {
        name: 'Users',
        key: 'users',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/users',
        pathToEdit: '/edit/users',
        pathToNew: '/new/users',
        keys: [
            {name: 'Name', key: "displayName", type: 'text', required: 'true'},
            {name: 'Email', key: "email", type: 'email', required: 'true'},
        ],
        canAddNew: true
    }
};
