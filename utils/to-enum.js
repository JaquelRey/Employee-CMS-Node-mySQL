module.exports = function toEnum(obj) {
    let id = 1;
    for (const key of Object.keys(obj)) {
        obj[key] = id++;
    }
}