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
    }
}