function randomUserCredential() {
    return {
        username: 'user-' + Math.floor(Math.random() * 1000000),
        password: 'pass-' + Math.floor(Math.random() * 1000000),
    };
}

module.exports = {
    randomUserCredential
};