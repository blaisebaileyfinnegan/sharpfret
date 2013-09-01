module.exports = {
    login: function (req, res) {
        res.render('admin/login');
    },

    index: function (req, res) {
        res.render('admin/index');
    },

    post: {
        post : function (req, res) {
            var title = req.body.title;
            var content = req.body.content;

            req.postProvider.newPost(title, content, function(id) {
                    res.end();
                });
        },

        get : function (req, res) {
            res.render('admin/post');
        }
    }
};
