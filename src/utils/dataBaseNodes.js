import {routes} from "./routes";

// eslint-disable-next-line
const flatMap = c => {
    if (c == null || c === undefined) {
        return [];
    }

    const items = [];
    Object.values(c).forEach(child => {
        items.push(child);
    });
    return items;
};

export const nodes = {
    leitura: {
        name: 'Data',
        key: 'leitura',
        path: routes.leitura,
        flat: c => c,
        orderByChild: null,
        pathToEdit: '/edit/leitura',
        pathToNew: '/new/leitura',
        keys: ["cliente", "data", "temperatura", "umidade"],
        canAddNew: true
    },
    users: {
        name: 'Users',
        key: 'users',
        path: routes.users,
        flat: c => c,
        orderByChild: null,
        pathToEdit: '/edit/users',
        pathToNew: '/new/users',
        keys: ["displayName", "email"],
        canAddNew: true
    }
};
