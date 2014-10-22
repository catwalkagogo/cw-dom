import Enumerable = require('linq');
import escapeHtml = require('escape-html');
import _ = require('underscore');

//#region Html
class Html {
	public static escape(html:string): string {
		return escapeHtml(html);
	}

	public static tag(name: string, attrs: Object = {}, content: string= null): string {
		var html = name;

		Enumerable
			.from(attrs)
			.select(p => {
				if(_.isBoolean(p.value)) {
					p.value = (p.value) ? '' : null;
				}
				return p;
			})
			.where(p => _.isString(p.value) || _.isNumber(p.value))
			.where(p => p.value !== null)
			.select(p => p.key + ((p.value) ? '="' + Html.escape(p.value) + '"' : ''))
			.forEach(p => {
				html += ' ' + p;
			});

		if(content) {
			html = '<' + html + '>' + content + '</' + name + '>';
		} else {
			html = '<' + html + ' />';
		}

		return html;
	}
}
//#endregion

export = Html;