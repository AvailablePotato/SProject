import {LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';

export default class FilterPanel extends LightningElement {

    picklists;
    activeSections = [];
    fieldApiNameMap = new Map();
    selectedFilters = new Map();

    @wire(getPicklistValuesByRecordType, {
        objectApiName: PRODUCT_OBJECT,
        recordTypeId: '012000000000000AAA',
    })
    picklistValues({data, error}) {
        if (data) {
            this.picklists = this.readPicklistValues(data.picklistFieldValues);
            this.activeSections = this.picklists.map((item) => item.label);
            Object.keys(data.picklistFieldValues).forEach((picklist) => {
                this.fieldApiNameMap.set(picklist.indexOf("__c") === -1 ? picklist : picklist.substring(0, picklist.indexOf("__c"))
                    , picklist);
            });
        }
        if (error) {
            console.log(error);
        }
    }

    readPicklistValues(picklistValues) {
        const map = [];
        Object.keys(picklistValues).forEach((picklist) => {
            map.push({
                label: picklist.indexOf("__c") === -1 ? picklist : picklist.substring(0, picklist.indexOf("__c")),
                items: picklistValues[picklist].values.map((item) => ({
                    label: item.label,
                    value: item.value,
                }))
            });
        });
        return map;
    }

    handleCheckboxChange(event) {
        let picklistName = event.target.name;
        let newValues = event.detail.value;
        let apiKey = this.fieldApiNameMap.get(picklistName);
        if (newValues.length > 0) {
            this.selectedFilters.set(apiKey, newValues);
        }
        else {
            this.selectedFilters.delete(apiKey);
        }
        let mapCopy = new Map(Array.from(this.selectedFilters));
        const filterUpdateEvent = new CustomEvent('filterchanged', {
            detail: mapCopy});
        this.dispatchEvent(filterUpdateEvent);
    }
}