var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Widgets from './Widgets';
var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        var _this = _super.call(this) || this;
        _this.allProductIds = [];
        _this.isSingleProduct = false;
        _this.pop = function (e) {
            console.log(_this);
            var element = e.target;
            var productId = element.getAttribute("data-gumroad-product-id");
            var isAutoPaymentForm = Boolean(element.getAttribute("data-gumroad-wanted"));
            _this.messageIframe({
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
            _this.scrollContainer.style.display = "block";
            // document.getElementsByClassName('gumroad-overlay-iframe')[0]
        };
        _this.overlayButtons = document.getElementsByClassName('gumroad-button');
        console.log(_this.overlayButtons);
        _this.attachEventListeners();
        _this.getProductLinks();
        console.log(_this.allProductIds);
        _this.buildIframe();
        return _this;
    }
    Overlay.prototype.getProductLinks = function () {
        for (var i = 0; i < this.overlayButtons.length; i++) {
            var overlayButton = this.overlayButtons[i];
            if (!this.isSingleProduct) {
                this.isSingleProduct = Boolean(overlayButton.getAttribute("data-gumroad-single-product"));
            }
            this.getProductId(overlayButton, i);
        }
    };
    Overlay.prototype.getProductId = function (overlayButton, index) {
        var productId = overlayButton.getAttribute('data-gumroad-product-id');
        this.allProductIds.push(productId);
    };
    Overlay.prototype.attachEventListeners = function () {
        var _this = this;
        Array.prototype.slice.call(this.overlayButtons).forEach(function (elem) {
            elem.addEventListener('click', _this.pop);
        });
    };
    Overlay.prototype.buildIframe = function () {
        // this.iframe && (this.iframe.remove(), delete this.iframe, delete this.iframeReady),
        this.scrollContainer = document.createElement("div");
        this.scrollContainer.className = "gumroad-scroll-container";
        // this.scrollContainer.style.width = "1536px";
        // this.scrollContainer.style.height = "1897px";
        // this.setthis.ScrollContainerStyle(),
        document.body.append(this.scrollContainer);
        var iframe = document.createElement("iframe");
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
    };
    Overlay.prototype.buildIframeSrc = function () {
        var src = this.domain + "/overlay_page?single_product_mode=" + this.isSingleProduct + "&";
        var params = "";
        if (this.allProductIds.length > 0) {
            params = params + ("all_permalinks=" + this.allProductIds.join(","));
        }
        return src + params;
    };
    Overlay.prototype.messageIframe = function (message) {
        var stringifyMessage = JSON.stringify(message);
        document.getElementsByClassName('gumroad-overlay-iframe')[0].contentWindow.postMessage(stringifyMessage, "https://gumroad.com");
    };
    return Overlay;
}(Widgets));
export default Overlay;
//# sourceMappingURL=Overlay.js.map