UserProvider = function(users) {
    this.users = users;
}

UserProvider.prototype.findUserById = function(id, callback) {
    var idx = id - 1;
    if (this.users[idx]) {
        callback(null, this.users[idx]);
    } else {
        callback(new Error('User ' + id + ' does not exist'));
    }
}

UserProvider.prototype.findUserByName = function(username, callback) {
    for (var i = 0, len = this.users.length; i < len; i++) {
        var user = this.users[i];
        if (user.username == username) {
            return callback(null, user);
        }
    }

    return callback(null, null);
}

module.exports = UserProvider;
