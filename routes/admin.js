module.exports = {
    login: function (req, res) {
        res.render('admin/login');
    },

    index: function (req, res) {
        res.render('admin/index', {
            infoboxes: req.infoboxes
        });
    },

    post: {
        post: function (req, res) {
            var title = req.body.title;
            var content = req.body.content;

            res.postProvider.newPost(title, content, function(id) {
                res.end();
            });
        },

        get: function (req, res) {
            res.render('admin/post');
        }
    },

    newInfobox: {
        post: function (req, res) {
            var name = req.body.name;
            var content = req.body.content;

            res.infoboxProvider.newInfobox(name, content, function() {
                res.end();
            });
        },

        get: function (req, res) {
            res.render('admin/infobox');
        }
    },
    
    editInfobox: {
        post: function (req, res) {
            var name = req.params.name;
            var content = req.body.content;
            console.log(req.params);

            res.infoboxProvider.setInfobox(name, content, function(err) {
                if (err) throw err;

                res.end();
            });
        },

        get: function (req, res) {
            res.render('admin/infobox', {
                infobox: req.infobox,
                disabled: true
            });
        }
    }
};
