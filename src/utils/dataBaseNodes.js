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
    data: {
        name: 'Data',
        key: 'data',
        path: routes.data,
        flat: c => flatMap(c),
        keys: ["UV", "animal", "animalName", "datetime", "deviceAddress", "freqHeart", "freqRespiratory", "humidity", "light", "shadowing", "temperature", "temperatureIButton"]
    },
    users: {
        name: 'Users',
        key: 'users',
        path: routes.users,
        flat: c => c,
        keys: ["displayName", "permission", "photoUrl", "uid"]
    }
};
