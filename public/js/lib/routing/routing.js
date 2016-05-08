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

function getPage(pathname) {
    if (pathname.indexOf('/login') > 0) {
        return 'login';
    } else if (pathname.indexOf('/poll') > 0) {
        return 'poll';
    } else if(pathname.indexOf('/dashboard') > 0) {
        return 'dashboard';
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
    return pageInfo[getPage(payload.pathname)];
}