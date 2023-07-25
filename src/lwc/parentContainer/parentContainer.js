import {LightningElement} from 'lwc';

export default class ParentContainer extends LightningElement {
    parentSearchQuery = '';
    parentFilterMap = new Map();
    handleFilterChange(event) {
        this.parentFilterMap = event.detail;
    }
    handleSearchQueryChange(event) {
        this.parentSearchQuery = event.detail;
    }
}