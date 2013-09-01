InfoboxProvider = function(connection) {
    this.connection = connection;
    this.connection.connect(function(e) {});
};

InfoboxProvider.prototype.getInfoboxByName = function (name, callback) {
    var sql = 'SELECT i.name, i.content FROM infoboxes as i WHERE i.name = ?';

    this.connection.query(sql, [name], function(err, results) {
        if (err) throw err;

        callback(results[0]);
    });
};

InfoboxProvider.prototype.getInfoboxes = function (callback) {
    var sql = 'SELECT i.name, i.content FROM infoboxes as i';

    this.connection.query(sql, function(err, results) {
        if (err) throw err;

        callback(results);
    });
};

InfoboxProvider.prototype.newInfobox = function (name, content, callback) {
    var insert = {
        name: name,
        content: content
    };
    var sql = 'INSERT INTO infoboxes SET ?';

    this.connection.query(sql, insert, function(err, result) {
        if (err) throw err;

        callback();
    });
}

InfoboxProvider.prototype.setInfobox = function (name, content, callback) {
    this.connection.query('UPDATE infoboxes SET content = ? WHERE name = ?', 
        [content, name],
        function (err, result) {
            callback(err, result);
    });
}

module.exports = InfoboxProvider;
