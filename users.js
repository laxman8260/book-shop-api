let users = [];

const isValid = (username) => {
    return users.find(user => user.username === username);
};

const authenticatedUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

module.exports = {
    users,
    isValid,
    authenticatedUser
};