var __ = require('underscore');
var Node = require('./lib/Node');
exports.Node = Node;
var Html = require('./lib/Html');
exports.Html = Html;

function fixContents(contents) {
    if (__.isArray(contents)) {
        return contents;
    } else {
        return [contents];
    }
}

function createNode(tagName, attrOrContents, contents) {
    var len = arguments.length;
    if (len == 1) {
        return new exports.Node(tagName);
    } else if (len == 2) {
        if (__.isArray(attrOrContents)) {
            return new exports.Node(tagName, {}, fixContents(attrOrContents));
        } else if (__.isObject(attrOrContents)) {
            var attr = attrOrContents;
            return new exports.Node(tagName, attr);
        } else {
            return new exports.Node(tagName, {}, fixContents(attrOrContents));
        }
    } else if (len >= 3) {
        return new exports.Node(tagName, attrOrContents, fixContents(contents));
    }
}
exports.createNode = createNode;

function createRawHtml(html) {
    return exports.Node.createRawHtml(html);
}
exports.createRawHtml = createRawHtml;

exports._ = exports.createNode;
exports.$ = exports.createRawHtml;
//# sourceMappingURL=index.js.map
