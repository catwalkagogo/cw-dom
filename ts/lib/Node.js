var Enumerable = require('linq');
var escapeHtml = require('escape-html');
var _ = require('underscore');
var Core = require('cw-core');
var Accessor = Core.Accessor;
var Html = require('./Html');

var Node = (function () {
    function Node(tagName, attr, contents) {
        if (typeof attr === "undefined") { attr = {}; }
        if (typeof contents === "undefined") { contents = []; }
        var _this = this;
        this._contents = [];
        if (tagName == null) {
            throw new Core.ArgumentNullException('tagName');
        }
        if (tagName == '') {
            throw new Core.ArgumentException('tagName', 'tagName is empty');
        }
        if (!_.isObject(attr)) {
            throw new Core.ArgumentException('attr', 'attr must be object');
        }
        if (!_.isArray(contents)) {
            throw new Core.ArgumentException('attr', 'contents must be array');
        }

        var a = tagName.split('#', 2);
        if (a.length == 2) {
            tagName = a[0];
        }
        this._tagName = tagName;

        var baseAttr = (a.length == 2) ? { id: a[1] } : {};
        this._attr = new Accessor(_.extend(baseAttr, attr));
        if (contents) {
            contents.forEach(function (v) {
                _this._contents.push(v);
            });
        }
    }
    Node.prototype.attr = function (keyOrData, value) {
        if (arguments.length == 0) {
            return this._attr.access();
        } else if (arguments.length == 1) {
            return this._attr.access(keyOrData);
        } else {
            return this._attr.access(keyOrData, value);
        }
    };

    Object.defineProperty(Node.prototype, "contents", {
        //#endregion
        //#region contents
        get: function () {
            return this._contents;
        },
        enumerable: true,
        configurable: true
    });

    Node.prototype.append = function (content) {
        var _this = this;
        if (_.isArray(content)) {
            content.forEach(function (v) {
                _this._contents.push(v);
            });
        } else {
            this._contents.push(content);
        }
        return this;
    };

    Node.prototype.removeAt = function (index) {
        delete this._contents[index];
        return this;
    };

    Node.prototype.empty = function () {
        this._contents = [];
        return this;
    };

    Object.defineProperty(Node.prototype, "innerHtml", {
        //#endregion
        //#region render
        get: function () {
            return this.renderInnerHtml(Node.DefaultRenderOption);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Node.prototype, "outerHtml", {
        get: function () {
            var attr = this.attr();
            var inner = this.innerHtml;

            return Html.tag(this._tagName, attr, inner);
        },
        enumerable: true,
        configurable: true
    });

    Node.prototype.render = function (attrToOverride, options) {
        if (typeof attrToOverride === "undefined") { attrToOverride = {}; }
        if (typeof options === "undefined") { options = null; }
        options = _.extend(Node.DefaultRenderOption, options);

        return this.renderInternal(options, attrToOverride);
    };

    Node.prototype.renderInternal = function (options, attrToOverride) {
        var attr;
        if (attrToOverride) {
            attr = _.extend(this.attr(), attrToOverride);
        } else {
            attr = this.attr();
        }

        var inner = this.renderInnerHtml(options);
        return Html.tag(this._tagName, attr, inner);
    };

    Node.prototype.renderInnerHtml = function (options) {
        var contents = this._contents;

        var inner = Enumerable.from(contents).where(function (v) {
            return v != null;
        }).select(function (v) {
            if (v instanceof Node) {
                var node = v;
                return node.renderInternal(options, null);
            } else if (v instanceof RawHtml) {
                return v.html;
            } else if (_.isString(v)) {
                return escapeHtml(v);
            } else {
                return escapeHtml(v.toString());
            }
        });

        return inner.toArray().join(options.contentsGlue);
    };

    //#endregion
    Node.createRawHtml = function (html) {
        return new RawHtml(html);
    };
    Node.DefaultRenderOption = {
        contentsGlue: "\n"
    };
    return Node;
})();

var RawHtml = (function () {
    function RawHtml(html) {
        this._html = html;
    }
    Object.defineProperty(RawHtml.prototype, "html", {
        get: function () {
            return this._html;
        },
        set: function (html) {
            this._html = html;
        },
        enumerable: true,
        configurable: true
    });

    return RawHtml;
})();

module.exports = Node;
//# sourceMappingURL=Node.js.map
