function getCurrentDate() {
    const date = new Date();
    return date.getDate() + '/' + (date.getMonth()) + '/' + date.getFullYear();
}

module.exports = {
    getCurrentDate
};