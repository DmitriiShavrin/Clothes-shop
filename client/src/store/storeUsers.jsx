import { makeAutoObservable } from "mobx";
import { request } from '../config';
import storeCustomer from "./storeCustomer";

class Store {

    // REGISTATION
    formRegister = {
        name: '',
        last_name: '',
        paternal: '',
        email: '',
        pass: '',
        reg_date: new Date().toLocaleString(),
        gender: '',
        subscribtion: false,
        messages: false,
        validation: false,
        birth: ''
    };

    // LOGIN
    formLogin = {
        email: '',
        pass: ''
    };

    Account = null;

    notify = '';
    error = '';

    constructor() {
        makeAutoObservable(this);
        this.checkToken();
        this.getUsers();
    };

    allUsers = [];


    //CHECK TOKEN

    checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.checkLogin(token)
        }
    }

    // REGISTRATION

    setFormRegister(key, value) {
        this.formRegister[key] = value;
    };

    register(e) {
        e.preventDefault();
        for (const key in this.formRegister) {
            if (!this.formRegister[key].trim()) {
                this.error = `Field ${key} incorrect`
                return;
            }
        }
        request('/users/register', (data) => {
            switch (data.status) {
                case 'ok':
                    this.notify = 'Registred';
                    this.error = '';
                    e.target.reset();
                    break;
                case 'already':
                    this.error = 'User exists';
                    this.notify = '';
                    break;
                default:
                    this.error = 'error';
                    this.notify = '';
            }
        },
            'post', this.formRegister)
    };

    // LOGIN

    setFormLogin(key, value) {
        this.formLogin[key] = value;
    };

    login(e) {
        e.preventDefault();
        for (const key in this.formLogin) {
            if (!this.formLogin[key].trim()) {
                this.error = `Field ${key} incorrect`;
                return;
            }
        }
        request('/users/login', (data) => {
            this.notify = this.error = '';
            if (data.status == 'ok') {
                localStorage.setItem('token', data.token);
                this.notify = 'Login success';
                this.Account = { ...data };
                window.location.href = this.Account.role == "ADMIN" ? '/all_items' : '/my_purchases'
            } else if (data.status == 'blocked') {
                this.error = 'Your account has been blocked';
            } else {
                this.error = 'Non valid data'
            }
        }, 'post', this.formLogin)
    };

    checkLogin(token) {
        request('/users/check', (data) => {
            this.notify = this.error = '';
            if (data.status == 'ok') {
                this.Account = { ...data };
                storeCustomer.getAllFavorites();
            } else {
                this.logout();
            }
        }, 'post', { token: token })
    };

    //Logout
    logout() {
        localStorage.removeItem('token');
        this.Account = null;
        window.location.href = '/'
    };

    // get all users
    getUsers() {
        request('/users/all', (data) => {
            if (data.length) {
                this.allUsers = data.filter(user => user._id !== this.Account._id)
            }
        })
    }

    //delete user

    deleteUser(id) {
        request(`/users/${id}`, (data) => {
            if (data.length) {
                this.allUsers = data;
            }
        }, 'delete')
    };

    //block user
    blockUser(id) {
        request(`/users/block/${id}`, (data) => {
            if (data.length) {
                this.allUsers = data;
            }
        }, 'put')
    };
    unBlockUser(id) {
        request(`/users/unblock/${id}`, (data) => {
            if (data.length) {
                this.allUsers = data;
            }
        }, 'put')
    };


}

export default new Store();