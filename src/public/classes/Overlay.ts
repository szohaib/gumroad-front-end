import Widgets from './Widgets'

export default class Overlay extends Widgets {
    constructor() {
        super();

        this.overlayButtons = document.getElementsByClassName('gumroad-button');

        console.log(this.overlayButtons)
        this.attachEventListeners();
        this.getProductLinks();
        console.log(this.allProductIds)
        this.buildIframe();
    }

    public getProductLinks() {
        for (let i = 0; i < this.overlayButtons.length; i++) {
            const overlayButton: Element = this.overlayButtons[i];
            if (!this.isSingleProduct) {
                this.isSingleProduct = Boolean(overlayButton.getAttribute("data-gumroad-single-product"));
            }
            this.getProductId(overlayButton, i);
        }
    }

    public getProductId(overlayButton: Element, index: number) {
        const productId = overlayButton.getAttribute('data-gumroad-product-id');
        this.allProductIds.push(productId)
    }

    public attachEventListeners() {
        Array.prototype.slice.call(this.overlayButtons).forEach((elem: Element) => {
            elem.addEventListener('click', this.overlayButtonClicked)
        })
    }

    public buildIframe() {
        // this.iframe && (this.iframe.remove(), delete this.iframe, delete this.iframeReady),
        this.scrollContainer = document.createElement("div");
        this.scrollContainer.className = "gumroad-scroll-container";
        // this.scrollContainer.style.width = "1536px";
        // this.scrollContainer.style.height = "1897px";
        // this.setthis.ScrollContainerStyle(),
        document.body.append(this.scrollContainer);
        const iframe = document.createElement("iframe");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("allowFullScreen", "allowfullscreen");
        iframe.width = "1536px";
        iframe.height = "1897px";
        // iframe.allowtransparency = !0;
        iframe.classList.add("gumroad-overlay-iframe");
        // iframe.onload = function () {
        //     e.setupMessaging();
        // })
        iframe.src = this.buildIframeSrc();
        this.scrollContainer.append(iframe);
        this.scrollContainer.style.display = "none";
    }

    public buildIframeSrc() {
        const src = `${this.domain}/overlay_page?single_product_mode=${this.isSingleProduct}&`;
        let params = ""
        if (this.allProductIds.length > 0) {
            params = params + `all_permalinks=${this.allProductIds.join(",")}`

        }
        return src + params
    }

    public overlayButtons: HTMLCollection;
    public allProductIds: Record<string, any> = [];
    public scrollContainer: HTMLDivElement;
    public isSingleProduct = false;


    public overlayButtonClicked = (e: Event) => {
        console.log(this);
        const element: Element = e.target as Element;
        const productId = element.getAttribute("data-gumroad-product-id");
        const isAutoPaymentForm = Boolean(element.getAttribute("data-gumroad-wanted"))

        this.messageIframe({
            overlayMethod: "getProduct",
            overlayArgs: {
                as_modal: true,
                referrer: "%2F",
                url_parameters: {
                    source_url: "http%3A%2F%2F127.0.0.1%3A5500%2Findex.html",
                },
                permalink: productId,
                offerCodeName: null,
                wanted: isAutoPaymentForm
            },
        });

        this.scrollContainer.style.display = "block"

        // document.getElementsByClassName('gumroad-overlay-iframe')[0]
    }

    public messageIframe(message: Record<string, any>) {
        const stringifyMessage = JSON.stringify(message);
        (document.getElementsByClassName('gumroad-overlay-iframe')[0] as any).contentWindow.postMessage(stringifyMessage, "https://gumroad.com")
    }
}