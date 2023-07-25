import {api} from 'lwc';
import LightningModal from 'lightning/modal';

export default class ModalProduct extends LightningModal {
    @api img;
    @api name;
    @api typeFamily
    @api description;
    @api price;
    @api productId;
    handleOkay() {
        this.close('okay');
    }
}