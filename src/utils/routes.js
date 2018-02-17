export const routes = {
    root: '/',
    login: '/login',
    newUser: '/newUser',
    data: '/data/:node',
    edit: '/edit/:node/:id',
    leitura: '/data/:node',
    welcome: '/welcome',
    users: '/data/:node',
};

export const links = {
    welcome: '/welcome',
    data: '/data/data',
    leitura: '/data/leitura',
    users: '/data/users',
};

export const routesToPrint = ['leitura', 'users', 'welcome'];