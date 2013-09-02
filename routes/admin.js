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

            if ('preview' in req.body) {
                var date = new Date();

                var post = {
                    id: 1,
                    title: title,
                    content: content,
                    created: date.toDateString()
                };

                res.render('post', {
                    title: 'sharpfret - View Post',
                    post: post,
                    infoboxes: req.infoboxes,
                    context: true
                });
                return;
            } else {
                res.postProvider.newPost(title, content, function(id) {
                    res.end();
                });
            }
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
