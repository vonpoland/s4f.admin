const nestedPathRegex = /\/([a-z]+)\/([a-z\-]+)\/([a-z]+)/i;
const pageInfo = {
    login: {
        displayPageInfo: false
    },
    dashboard: {
        displayPageInfo: true,
        breadcrumb: 'Dashboard',
        title: 'Dashboard',
        description: '',
        active: 'dashboard'
    },
    interaction: {
        displayPageInfo: true,
        breadcrumb: 'Interactions',
        title: 'My Live Interactions',
        description: '',
        active: 'interaction'
    }
};

const nestedPageInfo = {
    interaction: {
        edit: {
            displayPageInfo: true,
            breadcrumb: 'Edit interaction',
            title: 'Edit interaction',
            description: 'Edit your interaction details here',
            active: 'interaction'
        },
        manage: {
            displayPageInfo: true,
            breadcrumb: 'Manage interaction',
            title: 'Manage interaction',
            description: 'Manage your interaction here',
            active: 'interaction'
        },
        results: {
            displayPageInfo: true,
            breadcrumb: 'Interaction results',
            title: 'View interaction results',
            description: 'View interaction results here',
            active: 'interaction'
        }
    }
};

function nestedPathInfo(parent, name, action) {
    return nestedPageInfo[parent][action];
}

function getPage(pathname) {
    var nestedPath = pathname.match(nestedPathRegex);

    if(nestedPath && nestedPath.length > 0) {
        nestedPath.shift();
        return nestedPathInfo(...nestedPath);
    }

    if (pathname.indexOf('/login') > 0) {
        return pageInfo['login'];
    } else if (pathname.indexOf('/interaction') > 0) {
        return pageInfo['interaction'];
    } else if(pathname.indexOf('/dashboard') > 0) {
        return pageInfo['dashboard'];
    } else if(pathname.indexOf('/') === 0) {
        return pageInfo['dashboard'];
    }
}

export function getPath(routing) {
    var paths = routing.pathname.split('/');
    var parent = paths.length > 2 ? paths[2] : null;
    var poll = paths.length > 3 ? paths[3] : null;

    return {
        parent: parent,
        pollName: poll
    };
}

export function getPageInfo(payload) {
    return getPage(payload.pathname);
}