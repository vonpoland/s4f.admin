function updateOnlyPath(path, data, result) {
    result = result || {};

    var obj = Object
        .keys(data)
        .reduce(function (acc, key) {
            var value = data[key];
            var newPath = [path, key].join('.');

            if (typeof value === 'object') {
                updateOnlyPath(newPath, value, acc);
                return acc;
            } else {
                acc[newPath] = value;
            }

            return acc;
        }, result);

    return {
        $set: obj
    };
}

exports.updateOnlyPath = updateOnlyPath;