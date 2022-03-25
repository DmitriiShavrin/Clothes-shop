import { makeAutoObservable } from "mobx";
import { request } from '../config';
import storeItems from "./storeItems";
import storeUsers from "./storeUsers";

class Store {
    constructor() {
        makeAutoObservable(this);
    };


    myFavorites = [];
    myPurchases = [];

    modal_login = false;
    model_login = { email: '' };

    modal_pass = false;
    model_pass = { pass: '' };

    model_add_cards = {};

    model_social_network = { title: '', account: '' }

    modal_name = false;
    model_name = { name: '' };

    modal_last_name = false;
    model_last_name = { last_name: '' };

    modal_paternal = false;
    model_paternal = { paternal: '' };

    sold_model = {};
    modal = false;


    //add my favorite items 

    addToFavorite(id) {
        const favIndex = storeUsers.Account.favorite.indexOf(id)
        if (favIndex != -1) {
            storeUsers.Account.favorite.splice(favIndex, 1)
        } else {
            storeUsers.Account.favorite.push(id)
        }

        console.log(storeUsers.Account.favorite)
        request(`/users/add_favorites/${storeUsers.Account._id}`, (data) => {
            if (data.status == 'ok') {
            }
        }, 'put', { favorite: JSON.stringify(storeUsers.Account.favorite) })
    };

    //get favorites NEWWWWWWWWWWWWWWWWWWWWWWW

    getAllFavorites() {
        request('/users/get_favorites', (data) => {
            if (data.status == 'ok') {
                this.myFavorites = [...data.body]
            }
        }, 'put', { favorite: JSON.stringify(storeUsers.Account.favorite) })
    }

    // change login and password
    // change LOGIN
    updateLogin(e, id) {
        e.preventDefault();

        request(`/users/update_login/${id}`, (data) => {
            if (data.status == 'ok') {
                this.model_login = '';
                this.modal_login = false
                window.location.reload();
            }
        }, 'put', { email: this.model_login })
    };

    openUpdateLogin() {
        this.model_login = storeUsers.Account.email;
        this.modal_login = true;
    };

    setFormLogin(value) {
        this.model_login = value
    };

    // change PASSPORT
    updatePass(e, id) {
        e.preventDefault();

        request(`/users/update_pass/${id}`, (data) => {
            if (data.status == 'ok') {
                this.model_pass = '';
                this.modal_pass = false
                window.location.reload();
            }
        }, 'put', { pass: this.model_pass })
    };

    openUpdatePass() {
        this.model_pass = storeUsers.Account.pass;
        this.modal_pass = true;
    };

    setFormPass(value) {
        this.model_pass = value
    };
    // add cards
    setFormCard(value) {
        this.model_add_cards = value;
    };

    addCards(e, id) {
        if (this.model_add_cards == null) {
            return null
        } else {
            storeUsers.Account.cards.push(this.model_add_cards)
        }
        e.preventDefault()
        request(`/users/add_cards/${id}`, (data) => {
            if (data.status == 'ok') {
                e.target.reset();
                this.model_add_cards = ''
            }
        }, 'put', storeUsers.Account)
    };

    deleteCard(id) {
        const cardIndex = storeUsers.Account.cards.indexOf(id)
        storeUsers.Account.cards.splice(cardIndex, 1)
        request('/users/delete_cards', (data) => {
            if (data.status == 'ok') {

            }
        }, 'put', storeUsers.Account)
    }

    // add social network

    setFormNetwork(key, value) {
        this.model_social_network[key] = value
    };

    addSocialNetwork(e, id) {

        const AccountCopy = { ...storeUsers.Account }

        if (this.model_social_network == null) {
            return null
        } else {
            storeUsers.Account.social_media.push(this.model_social_network);

            AccountCopy.social_media = JSON.stringify(storeUsers.Account.social_media);
        }
        e.preventDefault();
        request(`/users/add_social_network/${id}`, (data) => {
            if (data.status == 'ok') {
                e.target.reset();
                this.model_social_network = { title: '', account: '' }
            }
        }, 'put', AccountCopy);
    };

    deleteNetwork(id) {

        const AccountCopy = { ...storeUsers.Account }

        const socIndex = storeUsers.Account.social_media.indexOf(id)
        storeUsers.Account.social_media.splice(socIndex, 1);

        AccountCopy.social_media = JSON.stringify(storeUsers.Account.social_media);

        request('/users/delete_social_network', (data) => {
            if (data.status == 'ok') {

            }
        }, 'put', AccountCopy);
    }

    // change name, last name, paternal
    openUpdateName() {
        this.model_name = storeUsers.Account.name;
        this.modal_name = true;
    };
    openUpdateLastName() {
        this.model_last_name = storeUsers.Account.last_name;
        this.modal_last_name = true;
    };
    openUpdatePaternal() {
        this.model_paternal = storeUsers.Account.paternal;
        this.modal_paternal = true;
    };

    setFormName(value) {
        this.model_name = value;
    };
    setFormLastName(value) {
        this.model_last_name = value;
    };
    setFormPaternal(value) {
        this.model_paternal = value;
    };

    updateName(e, id) {
        e.preventDefault();
        request(`/users/update_name/${id}`, (data) => {
            if (data.status == 'ok') {
                e.target.reset();
                this.model_name = ''
                this.modal_name = false;
                window.location.reload();
            }
        }, 'put', { name: this.model_name })
    };
    updateLastName(e, id) {
        e.preventDefault();
        request(`/users/update_last_name/${id}`, (data) => {
            if (data.status == 'ok') {
                e.target.reset();
                this.model_last_name = ''
                this.modal_last_name = false;
                window.location.reload();
            }
        }, 'put', { last_name: this.model_last_name })
    };
    updatePaternal(e, id) {
        e.preventDefault();
        request(`/users/update_paternal/${id}`, (data) => {
            if (data.status == 'ok') {
                e.target.reset();
                this.model_paternal = ''
                this.modal_paternal = false;
                window.location.reload();
            }
        }, 'put', { paternal: this.model_paternal })
    };

    // get My purchases

    getMyPurchases() {
        request('/cart/customer_puchases', (data) => {
            if (data.status == 'ok') {
                this.myPurchases = [...data.body]
            }
            console.log(this.myPurchases)
        }, 'get', { id: storeUsers.Account._id })
    };

    // open the purchase
    openTheSoldItem(itm) {
        this.sold_model = { ...itm };
        this.modal = true;
    }

    closeTheSoldItem() {
        this.sold_model = {};
        this.modal = false;
    }

}




export default new Store();