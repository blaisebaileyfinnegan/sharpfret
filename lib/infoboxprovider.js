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

module.exports = InfoboxProvider;
