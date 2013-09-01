module.exports = function(req, res) {
    var posts = req.posts;
    var infoboxes = req.infoboxes;

    res.render('posts', {
        title: "sharpfret",
        posts: posts,
        infoboxes: infoboxes
    });
}
