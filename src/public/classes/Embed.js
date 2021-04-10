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
var Embed = /** @class */ (function (_super) {
    __extends(Embed, _super);
    function Embed() {
        var _this = _super.call(this) || this;
        _this.embeds = [];
        _this.createdEmbeds();
        return _this;
    }
    Embed.prototype.createdEmbeds = function () {
        var embedLinkElements = document.getElementsByClassName('gumroad-product-embed');
        for (var i = 0; i < embedLinkElements.length; i++) {
            var embedLinkElement = embedLinkElements[i];
            this.div = embedLinkElement;
            this.productId = embedLinkElement.getAttribute("data-gumroad-product-id");
            this.domain = "https://" + embedLinkElement.getAttribute("data-gumroad-domain");
            this.embeds.push(embedLinkElement);
            this.showEmbed();
        }
    };
    Embed.prototype.showEmbed = function () {
        this.createIframe();
        this.buildUrl();
    };
    Embed.prototype.createIframe = function () {
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("allowFullScreen", "allowfullscreen");
        this.iframe.className = "gumroad-embed-iframe";
        this.iframe.width = "100%";
        this.iframe.height = "100%";
        if (this.div.childNodes[0]) {
            this.div.childNodes[0].style.display = "none";
        }
        this.div.parentNode.insertBefore(this.iframe, this.div);
    };
    Embed.prototype.buildUrl = function () {
        var url = this.productId ? this.domain + "/l/" + this.productId : '';
        if (!url) {
            console.error("Gumroad : No product id detected");
        }
        this.iframe.setAttribute("src", url);
    };
    return Embed;
}(Widgets));
export default Embed;
//# sourceMappingURL=Embed.js.map