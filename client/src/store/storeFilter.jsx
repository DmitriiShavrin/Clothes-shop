import { makeAutoObservable } from "mobx";
import { request } from '../config';
import storeItems from "./storeItems";
import Config from '../config';

class Store {

    constructor() {
        makeAutoObservable(this);
    };

    setSearch(value) {
        Config.searchText = value
    };

    search(e) {
        e.preventDefault();
        request('/filter/search', (data) => {

            console.log('filter', Config.searchText, data);
            if (data.status == 'ok') {

                storeItems.spin = true;
                storeItems.allItems = data.body;

            }

            setTimeout(() => {
                storeItems.spin = false;

                document.querySelector('#search_inp').value = '';
                setTimeout(() => {
                    Config.searchText = '';

                }, 1000)

            }, 1000);
        }, 'post', { title: Config.searchText })
    }
}

export default new Store();

