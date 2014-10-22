var Enumerable = require('linq');
var escapeHtml = require('escape-html');
var _ = require('underscore');

var Html = (function () {
    function Html() {
    }
    Html.escape = function (html) {
        return escapeHtml(html);
    };

    Html.tag = function (name, attrs, content) {
        if (typeof attrs === "undefined") { attrs = {}; }
        if (typeof content === "undefined") { content = null; }
        var html = name;

        Enumerable.from(attrs).select(function (p) {
            if (_.isBoolean(p.value)) {
                p.value = (p.value) ? '' : null;
            }
            return p;
        }).where(function (p) {
            return _.isString(p.value) || _.isNumber(p.value);
        }).where(function (p) {
            return p.value !== null;
        }).select(function (p) {
            return p.key + ((p.value) ? '="' + Html.escape(p.value) + '"' : '');
        }).forEach(function (p) {
            html += ' ' + p;
        });

        if (content) {
            html = '<' + html + '>' + content + '</' + name + '>';
        } else {
            html = '<' + html + ' />';
        }

        return html;
    };
    return Html;
})();

module.exports = Html;
//# sourceMappingURL=Html.js.map
