export const nodes = {
    leitura: {
        name: 'Data',
        key: 'leitura',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/leitura',
        pathToEdit: '/edit/leitura',
        pathToNew: '/new/leitura',
        keys: ["cliente", "data", "temperatura", "umidade"],
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
        keys: ["displayName", "email"],
        canAddNew: true
    }
};
