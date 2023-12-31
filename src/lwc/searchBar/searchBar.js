import {LightningElement} from 'lwc';

const DELAY = 300;

export default class SearchBar extends LightningElement {
    searchKey = '';

    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
            const searchUpdateEvent = new CustomEvent('searchquerychanged', {detail: searchKey});
            this.dispatchEvent(searchUpdateEvent);
        }, DELAY);
    }
}