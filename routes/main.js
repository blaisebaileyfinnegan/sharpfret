module.exports = function(req, res) {
    var posts = req.posts;

    res.render('posts', {
        title: "sharpfret",
        posts: posts
    });
}
