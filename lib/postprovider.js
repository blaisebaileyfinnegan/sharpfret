PostProvider = function(connection) {
    this.connection = connection;
    this.connection.connect(function(e) {});
};


PostProvider.prototype.getPostById = function(id, callback) {
    var sql = 'SELECT p.id, p.title, p.content, p.created, p.modified FROM posts as p WHERE p.id = ' + this.connection.escape(id);

    this.connection.query(sql, function(err, results) {
        callback(err, results[0]);
    });
};

PostProvider.prototype.getPosts = function (limit, callback) {
    var sql = 'SELECT p.id, p.title, p.content, p.created, p.modified FROM posts as p ORDER BY p.id DESC LIMIT ' + limit;

    this.connection.query(sql, function(err, results) {
        if (err) throw err;

        callback(results);
    });
}

PostProvider.prototype.countPosts = function (callback) {
    var sql = 'SELECT count(p.id) as c FROM posts as p';

    this.connection.query(sql, function(err, results) {
        if (err) throw err;

        callback(results[0].c);
    });
}

PostProvider.prototype.newPost = function (title, content, callback) {
    var insert = {
        title: title,
        content: content,
        modified: 'NOW()'
    };
    var sql = 'INSERT INTO posts SET ?';

    this.connection.query(sql, insert, function(err, result) {
        if (err) throw err;

        callback(result.resultId);
    });
}

module.exports = PostProvider;

