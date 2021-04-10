import Widgets from "./Widgets";

export default class Build extends Widgets {
    constructor() {
        super();
        this.overlaySelectProduct?.addEventListener('change', this.onProductSelect);
        this.embedSelectProduct?.addEventListener('change', this.onProductSelect);
        this.overlaySingleProduct?.addEventListener('change', this.onSingleProductSelect);
        this.overlayAutoPayment?.addEventListener('change', this.onAutoPaymentSelect);
        this.subDomainUseElement?.addEventListener('change', this.onSelectEmbedSubDomain);

        this.overlayElement = document.createElement('button');
        this.overlayElement.type = "button";
        this.overlayElement.classList.add("gumroad-button");
        this.overlayElement.innerText = "Buy This"
       


        this.embedElement = document.createElement('div');
        this.embedElement.classList.add("gumroad-product-embed");
        this.embedElement.setAttribute("data-gumroad-domain" , "gumroad.com")


        const anchorTag = document.createElement('a');
        anchorTag.innerText = "Loading..."
        this.embedElement.appendChild(anchorTag)

        if (this.overlaySelectProduct && this.embedSelectProduct) {
            this.bindOverlayElementOnUI();
            this.bindEmbedElementOnUI();
        }
    }

    public overlaySelectProduct: HTMLElement = document.getElementById('overlay-select-product');
    public embedSelectProduct: HTMLElement = document.getElementById('embed-select-product');
    public overlaySingleProduct: HTMLElement = document.getElementById('single-product');
    public overlayAutoPayment: HTMLElement = document.getElementById('auto-payment');
    public subDomainUseElement: HTMLElement = document.getElementById('embed-sub-domain-use');


    public productSelected: string = '';
    // public embedProductSelected: string = '';

    public overlayElement: HTMLButtonElement;
    public embedElement: HTMLDivElement;

    public onSingleProductSelect = (e: Event) => {

        const isSingleProduct = (e.target as HTMLInputElement).checked;
        if (isSingleProduct) {
            this.overlayElement.setAttribute('data-gumroad-single-product', String(isSingleProduct));
        }
        else {
            this.overlayElement.removeAttribute('data-gumroad-single-product')
        }
        this.bindOverlayElementOnUI();
    }

    public onSelectEmbedSubDomain = (e: Event) => {
        if ((e.target as HTMLInputElement).checked) {
            this.embedElement.setAttribute("data-gumroad-domain", "thecodingcards.gumroad.com");
        }
        else {
            this.embedElement.setAttribute("data-gumroad-domain", "gumroad.com");
        }
        this.bindEmbedElementOnUI()
    }

    public onAutoPaymentSelect = (e: Event) => {
        const isAutoPayment = (e.target as HTMLInputElement).checked;
        if (isAutoPayment) {
            this.overlayElement.setAttribute('data-gumroad-wanted', String(isAutoPayment));
        }
        else {
            this.overlayElement.removeAttribute('data-gumroad-wanted');
        }

        this.bindOverlayElementOnUI();
    }

    public onProductSelect = (e: Event) => {
        this.productSelected = (e.target as HTMLSelectElement).value;
        const elementId = (e.target as HTMLSelectElement).id;
        const isOverlayProduct = elementId === "overlay-select-product" ? true : false;

        if (isOverlayProduct) {

            this.setDataProductId(this.productSelected, this.overlayElement);
            this.bindOverlayElementOnUI();
        }
        else {

            this.setDataProductId(this.productSelected, this.embedElement);
            this.bindEmbedElementOnUI();
        }



    }

    public setDataProductId(productSelected: string, element: Element) {
        if (productSelected !== '0') {
            element.setAttribute("data-gumroad-product-id", productSelected);
        }
        else {
            element.removeAttribute("data-gumroad-product-id")
        }
    }




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

    public bindOverlayElementOnUI = () => {
        (document.getElementById('showOverlayElement') as HTMLInputElement).value = (this.overlayElement.outerHTML);
    }
    public bindEmbedElementOnUI = () => {
        (document.getElementById('showEmbedElement') as HTMLInputElement).value = (this.embedElement.outerHTML);
    }
}