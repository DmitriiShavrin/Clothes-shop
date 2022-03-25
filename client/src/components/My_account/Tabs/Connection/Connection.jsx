import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Connection.css';
import storeUsers from '../../../../store/storeUsers';
import storeChat from '../../../../store/storeChat';


const Connection = observer(() => {
    return (
        <>
            <Navbar />
            <div className="my_account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="right_part">Обратная связь</div>
                            </div>
                            <form className="mb-3"
                            onSubmit={(e) => storeChat.message(e)}
                            >
                                <label for="" className="form-label">Написать письмо в поддержку</label>
                                <input type="text" className="form-control w-100" id="" placeholder="Your message"
                                onInput={(e) => { storeChat.setFormRequest('text', e.target.value) }} 
                                />
                            </form>
                            <br />
                            {
                                storeUsers.Account.chat.length
                                    ?
                                    storeUsers.Account.chat.map(message => (
                                        <div className="list-group">
                                            <a href="#" className={`list-group-item list-group-item-action my-2 ${message.from == 'Admin' ? 'bg-secondary' : 'bg-primary'} `}>
                                                <h5 className="mb-1">Отправитель: {message.from}</h5>
                                                <hr />
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Текст письма: {message.text}</h5>
                                                    <small className="text-muted">{message.text_date}</small>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                    :
                                    <h4>No messages</h4>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Connection
