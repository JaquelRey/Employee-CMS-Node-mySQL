let id = 1;

module.exports = function toEnum(obj) {
    for (const key of Object.keys(obj)) {
        if (obj[key] === undefined) {
            obj[key] = id++;
        } else {
            toEnum(obj[key]);
        }
    }
}