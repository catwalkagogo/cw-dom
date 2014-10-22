import Enumerable = require('linq');
import escapeHtml = require('escape-html');
import _ = require('underscore');
import Core = require('cw-core');
import Accessor = Core.Accessor;
import Html = require('./Html');
import RenderOptions = require('./RenderOptions');

class Node {
	public static DefaultRenderOption: RenderOptions = {
		contentsGlue: "\n",
	};
	private _tagName: string;
	private _contents: any[] = [];
	private _attr: Accessor;

	public constructor(tagName: string, attr: {}= {}, contents: any[]= []) {
		if(tagName == null) {
			throw new Core.ArgumentNullException('tagName');
		}
		if(tagName == '') {
			throw new Core.ArgumentException('tagName', 'tagName is empty');
		}
		if(!_.isObject(attr)) {
			throw new Core.ArgumentException('attr', 'attr must be object');
		}
		if(!_.isArray(contents)) {
			throw new Core.ArgumentException('attr', 'contents must be array');
		}

		var a = tagName.split('#', 2);
		if(a.length == 2) {
			tagName = a[0];
		}
		this._tagName = tagName;

		var baseAttr = (a.length == 2) ? { id: a[1] } : {};
		this._attr = new Accessor(_.extend(baseAttr, attr));
		if(contents) {
			contents.forEach(v => {
				this._contents.push(v);
			});
		}
	}

	//#region attr

	public attr(): any;
	public attr(key: string): any;
	public attr(key: string, value: any): void;
	public attr(data: Object): void;
	public attr(keyOrData?: any, value?: any): any {
		if(arguments.length == 0) {
			return this._attr.access();
		} else if(arguments.length == 1) {
			return this._attr.access(keyOrData);
		} else {
			return this._attr.access(keyOrData, value);
		}
	}

	//#endregion

	//#region contents

	public get contents(): any[]{
		return this._contents;
	}

	public append(content: any) : Node{
		if(_.isArray(content)) {
			content.forEach(v => {
				this._contents.push(v);
			});
		} else {
			this._contents.push(content);
		}
		return this;
	}

	public removeAt(index: number): Node {
		delete this._contents[index];
		return this;
	}

	public empty(): Node {
		this._contents = [];
		return this;
	}

	//#endregion

	//#region render

	public get innerHtml(): string {
		return this.renderInnerHtml(Node.DefaultRenderOption);
	}

	public get outerHtml(): string {
		var attr = this.attr();
		var inner = this.innerHtml;

		return Html.tag(this._tagName, attr, inner);
	}

	public render(attrToOverride: {} = {}, options: RenderOptions = null): string {
		options = _.extend(Node.DefaultRenderOption, options);

		return this.renderInternal(options, attrToOverride);
	}

	private renderInternal(options: RenderOptions, attrToOverride: {}): string {
		var attr;
		if(attrToOverride) {
			attr = _.extend(this.attr(), attrToOverride);
		} else {
			attr = this.attr();
		}

		var inner = this.renderInnerHtml(options);
		return Html.tag(this._tagName, attr, inner);
	}

	private renderInnerHtml(options: RenderOptions):string {
		var contents = this._contents;

		var inner = Enumerable
			.from(contents)
			.where(v => v != null)
			.select(v => {
				if(v instanceof Node) {
					var node = <Node>v;
					return node.renderInternal(options, null);
				} else if(v instanceof RawHtml) {
					return v.html;
				} else if(_.isString(v)) {
					return escapeHtml(v);
				} else {
					return escapeHtml(v.toString());
				}
			});

		return inner
			.toArray()
			.join(options.contentsGlue);
	}

	//#endregion

	public static createRawHtml(html: string): Object {
		return new RawHtml(html);
	}
}

class RawHtml {
	private _html;

	public constructor(html: string) {
		this._html = html;
	}

	public get html(): string {
		return this._html;
	}

	public set html(html: string) {
		this._html = html;
	}

}

export = Node;