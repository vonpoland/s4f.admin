export function getPath(routing) {
    var paths = routing.pathname.split('/');
    var parent = paths.length > 2 ? paths[2] : null;
    var poll = paths.length > 3 ? paths[3] : null;

    return {
        parent: parent,
        pollName: poll
    };
}