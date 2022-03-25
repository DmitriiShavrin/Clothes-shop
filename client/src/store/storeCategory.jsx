import { makeAutoObservable } from "mobx";
import { request } from '../config';

class Store {
    constructor() {
        makeAutoObservable(this);
        this.getCategories();
    };

    model = {
        c_title: '',
        c_url: ''
    };

    notify = '';
    error = '';

    allCategories = [];

    modal = false;

    setForm(key, value) {
        this.model[key] = value
    };

    //Creation

    create(e) {
        e.preventDefault();

        request('/category', (data) => {
                switch (data.status) {
                    case 'ok':
                        this.notify = 'created';
                        this.error = '';
                        e.target.reset();
                        this.allCategories = [...data.body];
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

    //Getting all categories

    getCategories() {
        request('/category', (data) => {
            if (data.length) {
                this.allCategories = data;
            }
        })
    };

    //Delete categories

    deleteCategory(id) {
        request(`/category/${id}`, (data) => {
            if (data.length) {
                this.allCategories = data;
            }
        }, 'delete')
    };

    //Editing of categories

    updateCategory(e, id) {
        e.preventDefault();
        request(`/category/${id}`, (data) => {
            if (data.length) {
                this.allCategories = data;
                this.modal = false;
                this.notify = 'created';
                e.target.reset();
            }
        }, 'put', this.model)
    }

    // Changing the space to input

    openUpdate(cat) {
        this.model = {...cat };
        this.modal = true;
    };

}

export default new Store();