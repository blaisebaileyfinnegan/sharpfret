var marked = require('marked');

module.exports = function (swig, insertBreaks) {
    if (insertBreaks) {
        marked.setOptions({
            breaks: true
        });
    }

    swig.setFilter('marked', function (input) {
        return marked(input);
    });
}
