cw-dom
======

Simple DOM builder for node js.

# API

SEE `cw-dom.d.ts`.

##Example

```
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
```

```
<html><head><title>PAGE TITLE</title>
<script type="text/javascript" src="jquery.min.js" /></head>
<body><h1 id="page-title">PAGE TITLE</h1>
<div class="content"><p>text</p>
<pre>line1
line2
line3
&lt;script type=&quot;text/javascript&quot;&gt;alert(&quot;test&quot;)&lt;/script&gt;</pre>
<script type="text/javascript">alert("test")</script></div></body></html>
```