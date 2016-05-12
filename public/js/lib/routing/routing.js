const nestedPathRegex = /admin\/([a-z]+)\/([a-z\-]+)\/([a-z]+)/i;
const pageInfo = {
    login: {
        displayPageInfo: false
    },
    dashboard: {
        displayPageInfo: true,
        breadcrumb: 'Dashboard',
        title: 'Dashboard',
        description: 'Statistics Overview',
        active: 'dashboard'
    },
    poll: {
        displayPageInfo: true,
        breadcrumb: 'Your polls',
        title: 'Polls',
        description: 'Information about your polls',
        active: 'poll'
    }
};

const nestedPageInfo = {
    poll: {
        edit: {
            displayPageInfo: true,
            breadcrumb: 'Edit poll',
            title: 'Edit poll',
            description: 'Edit your poll details here',
            active: 'poll'
        },
        manage: {
            displayPageInfo: true,
            breadcrumb: 'Manage poll',
            title: 'Manage poll',
            description: 'Manage your poll here',
            active: 'poll'
        },
        results: {
            displayPageInfo: true,
            breadcrumb: 'Poll results',
            title: 'View poll results',
            description: 'View poll results here',
            active: 'poll'
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
    } else if (pathname.indexOf('/poll') > 0) {
        return pageInfo['poll'];
    } else if(pathname.indexOf('/dashboard') > 0) {
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