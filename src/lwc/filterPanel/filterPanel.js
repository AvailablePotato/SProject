import {LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';

export default class FilterPanel extends LightningElement {

    picklists;
    activeSections = [];

    @wire(getPicklistValuesByRecordType, {
        objectApiName: PRODUCT_OBJECT,
        recordTypeId: '012000000000000AAA',
    })

    picklistValues({data, error}) {
        if (data) {
            this.picklists = this.readPicklistValues(data.picklistFieldValues);
            this.activeSections = this.picklists.map((item) => item.label);
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
                    name: item.value
                }))
            });
        });
        return map;
    }
}