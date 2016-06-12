exports.updateOnlyPath = function (path, data) {
    var obj = Object.keys(data).reduce(function (acc, key) {
        acc[path + '.' + key] = data[key];

        return acc;
    }, {});

    return {
        $set: obj
    };
};