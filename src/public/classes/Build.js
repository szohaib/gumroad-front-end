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
import Widgets from "./Widgets";
var Build = /** @class */ (function (_super) {
    __extends(Build, _super);
    function Build() {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this) || this;
        _this.overlaySelectProduct = document.getElementById('overlay-select-product');
        _this.embedSelectProduct = document.getElementById('embed-select-product');
        _this.overlaySingleProduct = document.getElementById('single-product');
        _this.overlayAutoPayment = document.getElementById('auto-payment');
        _this.subDomainUseElement = document.getElementById('embed-sub-domain-use');
        _this.productSelected = '';
        _this.onSingleProductSelect = function (e) {
            var isSingleProduct = e.target.checked;
            if (isSingleProduct) {
                _this.overlayElement.setAttribute('data-gumroad-single-product', String(isSingleProduct));
            }
            else {
                _this.overlayElement.removeAttribute('data-gumroad-single-product');
            }
            _this.bindOverlayElementOnUI();
        };
        _this.onSelectEmbedSubDomain = function (e) {
            if (e.target.checked) {
                _this.embedElement.setAttribute("data-gumroad-domain", "thecodingcards.gumroad.com");
            }
            else {
                _this.embedElement.setAttribute("data-gumroad-domain", "gumroad.com");
            }
            _this.bindEmbedElementOnUI();
        };
        _this.onAutoPaymentSelect = function (e) {
            var isAutoPayment = e.target.checked;
            if (isAutoPayment) {
                _this.overlayElement.setAttribute('data-gumroad-wanted', String(isAutoPayment));
            }
            else {
                _this.overlayElement.removeAttribute('data-gumroad-wanted');
            }
            _this.bindOverlayElementOnUI();
        };
        _this.onProductSelect = function (e) {
            _this.productSelected = e.target.value;
            var elementId = e.target.id;
            var isOverlayProduct = elementId === "overlay-select-product" ? true : false;
            if (isOverlayProduct) {
                _this.setDataProductId(_this.productSelected, _this.overlayElement);
                _this.bindOverlayElementOnUI();
            }
            else {
                _this.setDataProductId(_this.productSelected, _this.embedElement);
                _this.bindEmbedElementOnUI();
            }
        };
        // public onTypeChange = (e: Event) => {
        //     const type = (e.target as HTMLInputElement).value;
        //     console.log(type)
        //     if(type === 'overlay'){
        //         this.overlayElement.className = ""
        //         this.overlayElement.classList.add('gumroad-button');
        //     }
        //     else{
        //         this.overlayElement.className = ""
        //         this.overlayElement.classList.add('gumroad-embed-button');
        //     }
        //     this.bindOverlayElementOnUI();
        // }
        _this.bindOverlayElementOnUI = function () {
            document.getElementById('showOverlayElement').value = (_this.overlayElement.outerHTML);
        };
        _this.bindEmbedElementOnUI = function () {
            document.getElementById('showEmbedElement').value = (_this.embedElement.outerHTML);
        };
        (_a = _this.overlaySelectProduct) === null || _a === void 0 ? void 0 : _a.addEventListener('change', _this.onProductSelect);
        (_b = _this.embedSelectProduct) === null || _b === void 0 ? void 0 : _b.addEventListener('change', _this.onProductSelect);
        (_c = _this.overlaySingleProduct) === null || _c === void 0 ? void 0 : _c.addEventListener('change', _this.onSingleProductSelect);
        (_d = _this.overlayAutoPayment) === null || _d === void 0 ? void 0 : _d.addEventListener('change', _this.onAutoPaymentSelect);
        (_e = _this.subDomainUseElement) === null || _e === void 0 ? void 0 : _e.addEventListener('change', _this.onSelectEmbedSubDomain);
        _this.overlayElement = document.createElement('button');
        _this.overlayElement.type = "button";
        _this.overlayElement.classList.add("gumroad-button");
        _this.overlayElement.innerText = "Buy This";
        _this.embedElement = document.createElement('div');
        _this.embedElement.classList.add("gumroad-product-embed");
        _this.embedElement.setAttribute("data-gumroad-domain", "gumroad.com");
        var anchorTag = document.createElement('a');
        anchorTag.innerText = "Loading...";
        _this.embedElement.appendChild(anchorTag);
        if (_this.overlaySelectProduct && _this.embedSelectProduct) {
            _this.bindOverlayElementOnUI();
            _this.bindEmbedElementOnUI();
        }
        return _this;
    }
    Build.prototype.setDataProductId = function (productSelected, element) {
        if (productSelected !== '0') {
            element.setAttribute("data-gumroad-product-id", productSelected);
        }
        else {
            element.removeAttribute("data-gumroad-product-id");
        }
    };
    return Build;
}(Widgets));
export default Build;
//# sourceMappingURL=Build.js.map