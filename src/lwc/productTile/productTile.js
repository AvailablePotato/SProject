import {LightningElement, track, api} from 'lwc';
import modalProduct from 'c/modalProduct'
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductTile extends LightningElement {
    @track pairs =[];
    @track products =[];

    @api
    get searchquery() {
        return this.search;
    }
    set searchquery(value) {
        this.search = value;
        this.sendQuery();
    }
    @api
    get filtermap() {
        return this.filter;
    }
    set filtermap(value) {
        this.filter = value;
        this.sendQuery();
    }

    search = '';
    filter = new Map();

    sendQuery() {
        getProducts({ searchBarQuery: this.search, filters: this.filter})
            .then(result => {
                this.products = result;
                this.turnProductsIntoPairs(this.products);
            });
    }

    turnProductsIntoPairs(products) {
        this.pairs = [];
        let pair = [];
        for (let i = 0; i < products.length; i++) {
            if (i != 0 && i % 2 === 0) {
                this.pairs.push(pair);
                pair = [];
            }
            pair.push(products[i]);
        }
        if (pair.length > 0) this.pairs.push(pair);
    }

    openDetailsModal(event) {
        let element = event.target;
        let tile = element.closest(".tile");

        let tileImg = tile.querySelector(".slds-align_absolute-center").children[0].innerHTML;
        let tileName = tile.querySelector(".tile-text-name").innerHTML;
        let tileTypeFamily = tile.querySelector(".tile-text-types").innerHTML;
        let tileDescription = tile.querySelector(".slds-line-clamp").innerHTML;
        let tilePrice = tile.querySelector(".tile-text-bottom-price").innerHTML.toString();
        let tileId = element.dataset.item;

        const result = modalProduct.open({
            img: tileImg,
            name: tileName,
            typeFamily: tileTypeFamily,
            description: tileDescription,
            price: tilePrice,
            productId: tileId,
        });
    }
}