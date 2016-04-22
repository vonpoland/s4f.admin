export function getPath(routing) {
    var paths = routing.pathname.split('/');
    var parent = paths[0];
    var poll = paths.length > 1 ? paths[1] : null;

    return {
        parent: parent,
        pollName: poll
    };
}