var marked = require('marked');

module.exports = function (swig) {
    swig.setFilter('marked', function (input) {
        return marked(input);
    });
}
