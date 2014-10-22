import __ = require('underscore');
export import Node = require('./lib/Node');
export import Html = require('./lib/Html');

function fixContents(contents: any): any[]{
	if(__.isArray(contents)) {
		return contents;
	} else {
		return [contents];
	}
}

export function createNode(tagName: string): Node;
export function createNode(tagName: string, attr: {}): Node;
export function createNode(tagName: string, contents: any[]): Node;
export function createNode(tagName: string, contents: string): Node;
export function createNode(tagName: string, contents: Node): Node;
export function createNode(tagName: string, attr: {}, contents: any[]): Node;
export function createNode(tagName: string, attr: {}, contents: string): Node;
export function createNode(tagName: string, attr: {}, contents: Node): Node;
export function createNode(tagName: string, attrOrContents?: any, contents?: any): Node {
	var len = arguments.length;
	if(len == 1) {
		return new Node(tagName);
	} else if(len == 2) {
		if(__.isArray(attrOrContents)) {
			return new Node(tagName, {}, fixContents(attrOrContents));
		} else if(__.isObject(attrOrContents)) {
			var attr = attrOrContents;
			return new Node(tagName, attr);
		} else {
			return new Node(tagName, {}, fixContents(attrOrContents));
		}
	} else if(len >= 3) {
		return new Node(tagName, attrOrContents, fixContents(contents));
	}
}

export function createRawHtml(html: string) {
	return Node.createRawHtml(html);
}

export var _ = createNode;
export var $ = createRawHtml;