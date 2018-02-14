import {routes} from "./routes";


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
    data: {name: 'Data', key: 'data', path: routes.data, flat: c => flatMap(c)},
    users: {name: 'Users', key: 'users', path: routes.users, flat: c => c}
};
