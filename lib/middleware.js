module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next(); 
        } else {
            res.redirect('/admin/login');
        }
    },

    setupInfoboxes: function (req, res, next) {
        res.infoboxProvider.getInfoboxes(function(rows) {
            var infoboxes = new Object();
            for (var i = 0; i < rows.length; i++) {
                infoboxes[rows[i].name] = rows[i].content;
            }

            req.infoboxes = infoboxes;
            next();
        });
    },

    setupInfobox: function (req, res, next) {
        var name = req.params.name;

        req.infoboxProvider.getInfoboxByName(name, function(err, row) {
            if (err) {
                res.status(404);
                res.end();
            } else {
                req.infobox = row;
                next();
            }
        });
    },

    setupPosts: function (req, res, next) {
        res.postProvider.countPosts(function(count) {
            res.postProvider.getPosts(count, function(rows) {
                req.posts = rows;
                next();
            });
        });
    },

    setupPost: function (req, res, next) {
        var id = req.params.id;
        res.postProvider.getPostById(id, function(err, row) {
            if (err) {
                res.status(404);
                res.end();
            } else {
                req.post = row;
                next();
            }
        });
    }
};
