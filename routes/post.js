module.exports = function(req, res) {
    var post = req.post;
    var infoboxes = req.infoboxes;

    res.render('post', {
        title: 'sharpfret - View post',
        post: post,
        infoboxes: infoboxes
    });
}
