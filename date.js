exports.getDate = function () {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return today.toLocaleDateString("en-US", options);
}

exports.getDay = function () {
    const today = new Date();
    const options = { weekday: 'long' };
    return today.toLocaleDateString("en-US", options);
}
