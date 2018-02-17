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
        keys: ["cliente", "data", "temperatura", "umidade"]
    },
    users: {
        name: 'Users',
        key: 'users',
        path: routes.users,
        flat: c => c,
        orderByChild: null,
        pathToEdit: '/edit/users',
        keys: ["displayName", "email"]
    }
};
