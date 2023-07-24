import {LightningElement, track} from 'lwc';
import modalProduct from 'c/modalProduct'
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductTile extends LightningElement {
    @track pairs =[];
    products =[];
    connectedCallback(){
        getProducts()
            .then(result => {
                this.products = result;
                let pair = [];
                console.log(pair);
                for (let i = 0; i < this.products.length; i++)
                {
                    if ( i != 0 && i % 2 === 0) {
                        this.pairs.push(pair);
                        pair = [];
                    }
                    pair.push(this.products[i]);
                }
                if (pair.length > 0) this.pairs.push(pair);
            });
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