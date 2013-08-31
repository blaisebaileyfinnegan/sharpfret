module.exports = function(req, res) {
    var post = req.post;

    res.render('post', {
        title: 'sharpfret - View post',
        post: post
    });
}
