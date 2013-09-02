module.exports = function(req, res) {
    var post = req.post;
    var infoboxes = req.infoboxes;

    var context = false;
    if (req.query.context) {
        context = true;
    }

    res.render('post', {
        title: 'sharpfret - View post',
        post: post,
        infoboxes: infoboxes,
        context: context
    });
}
