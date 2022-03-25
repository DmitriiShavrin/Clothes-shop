import { makeAutoObservable } from "mobx";
import { request } from '../config';

class Store {
    constructor() {
        makeAutoObservable(this);
        this.getBanners();
        this.current();
    }

    model = {
        title: '',
        photo: '',
        background: ''
    }

    notify = '';
    error = '';

    img_min = null;
    img_show = false;

    edit_card_show = false;
    modal = false;

    allBanners = [];

    currentBanner = {};

    setFormBanner(key, value) {
        if (key == 'photo') {
            this.preview(value);
            this.model.old_photo = this.model.photo;
        }
        this.model[key] = value;
    };

    // Creation

    create(e) {
        e.preventDefault();

        request('/banners', (data) => {
            switch (data.status) {
                case 'ok':
                    this.notify = 'created';
                    this.error = '';
                    e.target.reset();
                    this.allBanners = data.body
                    break;
                case 'already exists':
                    this.notify = '';
                    this.error = 'already exists';
                    break;
                default:
                    this.error = 'error';
                    this.notify = ''
            }
        }, 'post', this.model)
        this.img_min = null;
        this.img_show = false;
    };

    preview(file) {
        const fReader = new FileReader();
        fReader.readAsDataURL(file);
        let _this = this;
        fReader.onloadend = function () {
            _this.img_min = fReader.result;
            _this.img_show = true;
        }
    };

    closeModal() {
        this.img_show = false
    };

    //Getting all

    getBanners() {
        request('/banners', (data) => {
            if (data.length) {
                this.allBanners = data
            }
        })
    }

    //Delete banner

    deleteBanner(id) {
        request(`/banners/${id}`, (data) => {
            if (data.length) {
                this.allBanners = data;
            }
        }, 'delete')
    }

    // Update banners

    updateBanner(e, id) {
        e.preventDefault();
        request(`/banners/${id}`, (data) => {
            if (data.status == 'ok') {
                this.allBanners = data.body;
                this.edit_card_show = false;
                e.target.reset();
            }
        }, 'put', this.model)
    };

    //Open update part

    openUpdate(ban) {
        this.model = { ...ban };
        this.edit_card_show = true;
    }

    closeUpdate() {
        this.model = null;
        this.edit_card_show = false;
    }

    //Get active

    activate(id) {
        request(`/banners/activate/${id}`, (data) => {
            if (data.status == "ok") {
                this.allBanners = data.body
            }
        }, 'put')
    };

    //get current banner

    current() {
        request('/banners/current', (data) => {
            if (data.status == 'ok') {
                this.currentBanner = data.body
            }
        })
    }


};



export default new Store();