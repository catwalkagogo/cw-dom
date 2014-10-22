var Dom = require('cw-dom');
var _ = Dom.createNode;
var $ = Dom.createRawHtml;

var html = _('html', [
    _('head', [
        _('title', 'PAGE TITLE'),
        _('script', { type: 'text/javascript', src: 'jquery.min.js' })
    ]),
    _('body', [
        _('h1#page-title', "PAGE TITLE"),
        _('div', { class: 'content' }, [
            _('p', 'text'),
            _('pre', [
                'line1',
                'line2',
                'line3',
                '<script type="text/javascript">alert("test")</script>'
            ]),
            $('<script type="text/javascript">alert("test")</script>')
        ])
    ])
]).render();

process.stdout.write(html + "\n");
//# sourceMappingURL=sample.js.map
