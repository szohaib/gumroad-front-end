import Widgets from './Widgets';

export default class Embed extends Widgets {
    constructor() {
        super();
        this.createdEmbeds();
    }

    public embeds: Record<string, any> = [];
    public iframe: HTMLIFrameElement;
    public div: Element;
    public productId: string;

    public createdEmbeds() {
        const embedLinkElements = document.getElementsByClassName('gumroad-product-embed');

        for (let i = 0; i < embedLinkElements.length; i++) {
            const embedLinkElement: Element = embedLinkElements[i];
            this.div = embedLinkElement;
            this.productId = embedLinkElement.getAttribute("data-gumroad-product-id");
            this.domain = `https://${embedLinkElement.getAttribute("data-gumroad-domain")}`;
            this.embeds.push(embedLinkElement);
            this.showEmbed();
        }
    }

    public showEmbed() {
        this.createIframe();
        this.buildUrl();
    }

    public createIframe() {
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("allowFullScreen", "allowfullscreen");
        this.iframe.className = "gumroad-embed-iframe";
        this.iframe.width = "100%";
        this.iframe.height = "100%";
        if (this.div.childNodes[0]) {
            (this.div.childNodes[0] as HTMLDivElement).style.display = "none";
        }
        this.div.parentNode.insertBefore(this.iframe, this.div);
    }

    public buildUrl() {
        const url = this.productId ? `${this.domain}/l/${this.productId}` : '';
        if(!url){
            console.error("Gumroad : No product id detected")
        }
        this.iframe.setAttribute("src", url);
    }
}