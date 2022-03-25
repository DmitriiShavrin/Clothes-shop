import { makeAutoObservable } from "mobx";
import { request } from '../config';
import storeUsers from "./storeUsers";

class Store {
    constructor() {
        makeAutoObservable(this);
    };

    watch = null;

    currentUser = null;
    currentDialog = null;
    currentChat = [];

    err = '';
    notify = '';

    formRequest = { 
        text: '',
        text_date: new Date().toLocaleString(),
        from: null,
        to: 'ADMIN'
    };

    setFormRequest(key, value) {
        this.formRequest[key] = value;
    };

    watchMess() {
        setTimeout(() => {
            if (this.Account.role == 'ADMIN')
                this.getAdminMessages();
            else
                this.getUserMessages(storeUsers.Account._id);
            this.watchMess();
        }, 2000)
    };

    message(e) {
        e.preventDefault();
        this.formRequest.from = storeUsers.Account.name
        storeUsers.Account.chat.unshift({ ...this.formRequest })
        this.sendMessage(e, storeUsers.Account._id, storeUsers.Account.chat);
    };

    messageAdmin(e) {
        e.preventDefault();
        this.formRequest.from = 'ADMIN'
        this.formRequest.to = this.currentUser;
        this.currentChat.unshift({ ...this.formRequest })
        this.sendMessage(e, this.currentDialog, this.currentChat);
        e.target.reset();
    };

    sendMessage(e, user_id, messages) {
        request(`/chat/add_chat/${user_id}`, (data) => {
            console.log(data)
            this.notify = this.err = '';
            if (data.status == 'ok') {
                this.notify = 'Message submitted';
                e.target.reset();
            } else
                this.err = 'User exists'
        }, 'put', { chat: JSON.stringify(messages) })
    };

    getAdminMessages(id = this.currentDialog, user = this.currentUser) {
        this.currentDialog = id;
        this.currentUser = user;
        if (this.currentDialog) {
            request(`/chat/chat/${id}`, (data) => {
                if (data.status == 'ok') {
                    if (data.body.length != this.currentChat.length) {
                        this.currentChat = [ ...data.body ];
                        console.log(this.currentChat);
                    }
                }
            })
        }
    };

    getUserMessages(id) {
        if (id) {
            request(`/chat/chat/${id}`, (data) => {
                if (data.status == 'ok') {
                    data.body = JSON.parse(data.body)
                    if (data.body.length != storeUsers.Account.chat.length) {
                        storeUsers.Account.chat = data.body;
                    }
                }
            })
        }
    };

}

export default new Store();