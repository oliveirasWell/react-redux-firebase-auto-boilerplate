// eslint-disable-next-line
export const flatMap = c => {
    if (c == null || c === undefined) {
        return [];
    }

    const items = [];
    Object.values(c).forEach(child => {
        items.push(child);
    });
    return items;
};