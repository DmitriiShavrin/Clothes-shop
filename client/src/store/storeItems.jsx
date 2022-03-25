import { makeAutoObservable } from "mobx";
import Config from '../config';
import storeCategory from './storeCategory';
import storeFilter from "./storeFilter";

const request = Config.request;

class Store {
    constructor() {
        makeAutoObservable(this);
        this.getItems();
        this.allNewItems();
    };

    validate = {
        price: {
            value: /^\d+$/,
            mess: 'Price incorrect'
        },
        discount: {
            value: /^\d+$/,
            mess: 'Discount incorrect'
        },
        quantity: {
            value: /^\d+$/,
            mess: 'Quantity incorrect'
        }
    }

    spin = true

    model = {
        title: '',
        category_id: '',
        photo: '',
        price: '',
        discount: '0',
        comment: '',
        quantity: ''
    };

    notify = '';
    error = '';

    img_min = null;
    img_show = false;

    edit_card_show = false;
    modal = false;

    if_discount = false;

    allItems = [];
    newItems = [];

    name_of_category = '';
    name_of_category_real = {};

    try_name_of_category = { _id: '' };

    // TO check for numbers and words
    validateForm(cb) {
        for (let key in this.validate) {
            for (let m in this.model) {
                if (key == m) {

                    console.log('ok');

                    if (this.model[m].search(this.validate[key].value) == -1) {
                        this.error = this.validate[key].mess;
                        return;
                    }
                }
            }
        }

        cb();
    }

    setFormItem(key, value) {
        if (key == 'photo') {
            this.preview(value);
            this.model.old_photo = this.model.photo;
        }
        this.model[key] = value;
    };

    // Creation

    create(e) {
        e.preventDefault();

        this.validateForm(() => {

            console.log('send data');

            request('/items', (data) => {
                switch (data.status) {
                    case 'ok':
                        this.notify = 'created';
                        this.error = '';
                        e.target.reset();
                        break;
                    case 'already':
                        this.notify = '';
                        this.error = 'accupaed';
                        break;
                    default:
                        this.error = 'error';
                        this.notify = ''
                }
            }, 'post', this.model)
            this.img_min = null;
            this.img_show = false;

        })


    };

    preview(file) {
        const fReader = new FileReader();
        fReader.readAsDataURL(file);
        let _this = this;
        fReader.onloadend = function () {
            _this.img_min = fReader.result
            _this.img_show = true
        }
    };

    closeModal() {
        this.img_show = false
    };

    //Getting all

    getItems() {
        request('/items', (data) => {
            if (data.length) {
                this.allItems = this.changeCatId(data)
            }
        })
    };

    //change the name of category_id

    changeCatId(data) {
        for (let x in data) {
            for (let y in storeCategory.allCategories) {
                if (data[x].category_id == storeCategory.allCategories[y]._id) {
                    data[x].category_title = storeCategory.allCategories[y].c_title
                }
            }
        }
        return data;
    }

    //Open-close discount

    openDiscount() {
        if (!this.if_discount)
            this.if_discount = true;
        else
            this.if_discount = false
    }

    // Delete item

    deleteItem(id) {
        request(`/items/${id}`, (data) => {
            if (data.length) {
                this.allItems = data;
            }
        }, 'delete')
    };

    //Edition of items

    updateItem(e, id) {
        e.preventDefault();
        request(`/items/${id}`, (data) => {
            if (data.length) {
                this.allItems = data;
                this.edit_card_show = false;
                e.target.reset();
            }
        }, 'put', this.model)
    };

    // Open update

    openUpdate(itm) {
        this.model = { ...itm };
        this.edit_card_show = true;
    };

    closeModalEdit() {
        this.edit_card_show = false;
        this.model = null;
    };

    // дата для ссылок 

    getData(c_url) {


        request(`/items/get_data/${c_url}`, (data) => {

            if (JSON.stringify(data.body.data) != JSON.stringify(this.allItems)) {
                this.spin = true;
                this.allItems = data.body.data;
                this.name_of_category = data.body.category_title;
                Config.searchText = '';
            }

            setTimeout(() => {
                this.spin = false;
            }, 1000)

        })

    };

    // make new

    newItem(id) {
        request(`/items/new/${id}`, (data) => {
            if (data.status == 'ok') {
                this.allItems = data.body
            }
        }, 'put')
    };

    // make non-new

    noNewItem(id) {
        request(`/items/non_new/${id}`, (data) => {
            if (data.status == 'ok') {
                this.allItems = data.body
            }
        }, 'put')
    };

    // only new items

    allNewItems() {
        request('/items/only_new', (data) => {
            if (data.status == 'ok') {
                this.newItems = data.body

            }
        })
    };

}

export default new Store();

