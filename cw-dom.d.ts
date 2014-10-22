declare module "cw-dom" {

// ts/lib/Html.d.ts
class Html {
    static escape(html: string): string;
    static tag(name: string, attrs?: Object, content?: string): string;
}

// ts/lib/Node.d.ts
class Node {
    static DefaultRenderOption: RenderOptions;
    private _tagName;
    private _contents;
    private _attr;
    constructor(tagName: string, attr?: {}, contents?: any[]);
    public attr(): any;
    public attr(key: string): any;
    public attr(key: string, value: any): void;
    public attr(data: Object): void;
    public innerHtml : string;
    public outerHtml : string;
    public render(attrToOverride?: {}, options?: RenderOptions): string;
    private renderInternal(options, attrToOverride);
    private renderInnerHtml(options);
    static createRawHtml(html: string): Object;
}

// ts/lib/RenderOptions.d.ts
interface RenderOptions {
    contentsGlue: string;
}

// ts/index.d.ts
export function createNode(tagName: string): Node;
export function createNode(tagName: string, attr: {}): Node;
export function createNode(tagName: string, contents: any[]): Node;
export function createNode(tagName: string, contents: string): Node;
export function createNode(tagName: string, contents: Node): Node;
export function createNode(tagName: string, attr: {}, contents: any[]): Node;
export function createNode(tagName: string, attr: {}, contents: string): Node;
export function createNode(tagName: string, attr: {}, contents: Node): Node;
export function createRawHtml(html: string): Object;
export var _: typeof createNode;
export var $: typeof createRawHtml;

}
