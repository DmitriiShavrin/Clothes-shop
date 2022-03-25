import { makeAutoObservable } from "mobx";
import { ThumbDownSVGIcon } from "react-md";
import { request } from '../config';
import storeItems from "./storeItems";
import storeUsers from "./storeUsers";

class Store {
    constructor() {
        makeAutoObservable(this);
        this.getPurchases();
    }

    items_in_cart = [];
    total = 0;
    total_final = 0;

    modal = false;
    сash = false;

    order = {
        user_id: '',
        user_name: '',
        total: '',
        adress: '',
        items: [],
        card: ''
    };

    sold_model = {};

    allPurchases = [];

    // get items in cart
    getCart() {
        this.items_in_cart = JSON.parse(localStorage.getItem('items')) || [];
        this.getTotal();
    }

    //add to cart

    addToCart(item) {

        const previous_products = localStorage.getItem('items') ? localStorage.getItem('items') : "[]";
        this.items_in_cart = JSON.parse(previous_products);
        const Check = this.items_in_cart.find((itm) => itm._id == item._id)
        if (Check) {
            Check.count++;
        } else {
            item.count = 1;
            this.items_in_cart.push(item);
        }
        localStorage.setItem('items', JSON.stringify(this.items_in_cart));
        this.getTotal();
    };

    //change the volume 

    changeCount(index, value) {
        this.items_in_cart[index].count = +value;
        localStorage.setItem('items', JSON.stringify(this.items_in_cart));
        this.getTotal();
    }

    //delete
    removeItem(index) {
        this.items_in_cart.splice(index, 1)
        localStorage.setItem('items', JSON.stringify(this.items_in_cart));
        this.getTotal();
    }
    //total summ
    getTotal() {
        this.total = 0
        this.items_in_cart.forEach((el) => {
            this.total += el.count * el.price
        })
    };
    // make an order

    openOrder() {
        if (storeUsers.Account) {
            this.order.user_name = storeUsers.Account.name;
            this.order.user_id = storeUsers.Account._id;
            this.order.total = this.total;
            this.order.items = this.items_in_cart;
            this.order.account = true;
            this.order.card = storeUsers.Account.cards;
            this.modal = true;
        } else {
            this.order.total = this.total;
            this.order.items = this.items_in_cart;
            this.order.account = false;
            this.modal = true;
        }
    };

    setFormOrder(key, value) {
        this.order[key] = value;
    };

    makeOrder(e) {
        e.preventDefault();
        let user_id = null;

        if (storeUsers.Account)
            user_id = storeUsers.Account._id;

        let copyOrder = { ...this.order };
        copyOrder.items = JSON.stringify(copyOrder.items)
        request(`/cart/make_order/${user_id}`, (data) => {
            if (data.status == 'ok') {
                this.closeOrderMenu();
                localStorage.removeItem('items');
                this.items_in_cart = []
                e.target.reset();
            }
        }, 'post', copyOrder)
    };

    closeOrderMenu() {
        this.modal = false;
        this.order = {
            user_id: '',
            user_name: '',
            total: '',
            adress: '',
            items: [],
            card: ''
        }
    };

    payByCash(value) {
        this.cash = value;
    };
    // get all purchases
    getPurchases() {
        request('/cart', (data) => {
            if (data.status == 'ok') {
                this.allPurchases = this.changeName(data.body)

                console.log(this.allPurchases);

                this.getTotalFinal();
            }
        })
    };
    //change the name of id Numbers

    changeName(data) {

        console.log(storeUsers.allUsers);

        for (let x in data) {
            data[x].username = 'no name';

            for (let y in storeUsers.allUsers) {     

                if (data[x].user_id == storeUsers.allUsers[y]._id) {
                    data[x].username = storeUsers.allUsers[y].name
                } 
                
            }
        }
        return data;
    }

    // get the earned money
    getTotalFinal() {
        this.total_final = 0
        this.allPurchases.forEach((el) => {
            this.total_final += el.total
        })
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