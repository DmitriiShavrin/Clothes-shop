import { makeAutoObservable } from "mobx";
import { request } from '../config';

const inititalModel = {
    title: '',
    adress: '',
    phone: '',
    email: ''
}


class Store {
    constructor() {
        makeAutoObservable(this);
        this.getShops();
    };

    model = {
        ...inititalModel
    };

    notify = '';
    error = '';

    allShops = [];

    modal = false;

    setForm(key, value) {
        this.model[key] = value
    };

    //Creation

    create(e) {
        e.preventDefault();

        request('/shops', (data) => {
            switch (data.status) {
                case 'ok':
                    this.notify = 'created';
                    this.error = '';
                    e.target.reset();
                    this.allShops = [...data.body];
                    break;
                case 'already':
                    this.error = 'accupaed';
                    this.notify = '';
                    break;
                default:
                    this.error = 'error';
                    this.notify = '';
            }
        },
            'post', this.model)
    };

    //Getting all shops

    getShops() {
        request('/shops', (data) => {
            if (data.length) {
                this.allShops = data;
            }
        })
    };

    //Delete shops

    deleteShop(id) {
        request(`/shops/${id}`, (data) => {
            if (data.length) {
                this.allShops = data;
            }
        }, 'delete')
    };

    //Editing of shops

    updateShop(e, id) {
        e.preventDefault();
        request(`/shops/${id}`, (data) => {
            if (data.status == 'ok') {
                this.allShops = data.body;
                this.notify = 'created';
                e.target.reset();
                this.model = {
                    ...inititalModel
                }
            }
        }, 'put', this.model)
    }

    // Changing the space to input

    openUpdate(cat) {
        this.model = { ...cat };
        this.modal = true;
    };

}

export default new Store();