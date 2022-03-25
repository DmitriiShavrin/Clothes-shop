import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Connection_admin.css';
import storeChat from '../../../../store/storeChat';
import storeUsers from '../../../../store/storeUsers';


const Connection_admin = observer(() => {
    return (
        <>
            <Navbar />
            <div className="my_account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-2">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="right_part">Переписка</div>
                            </div>
                            <br />
                            <div class="list-group">
                                {storeUsers.allUsers.length
                                    ?
                                    storeUsers.allUsers.map((user) => (

                                        user.role !== "ADMIN"
                                            ?
                                            <a href="#" class="list-group-item list-group-item-action" onClick={() => storeChat.getAdminMessages(user._id, user.name)}>{user.name}</a>
                                            :
                                            null
                                    ))
                                    :
                                    <h3>No users</h3>
                                }
                            </div>
                        </div>
                        <div className="col-5 margin_down">
                            <form className="mb-3" onSubmit={(e) => storeChat.messageAdmin(e)}>
                                <label for="" className="form-label fw-bold">Письма</label>
                                <input type="text" className="form-control mt-3" id="" placeholder="Your message" onInput={(e) => { storeChat.setFormRequest('text', e.target.value) }} />
                            </form>
                            {
                                storeChat.currentChat?.length
                                    ?
                                    storeChat.currentChat.map(message => (
                                        <div className="list-group">
                                            <a href="#" className={`list-group-item list-group-item-action my-2 ${message.from == 'Admin' ? 'bg-secondary' : 'bg-warning'} `}>
                                                <h5 className="mb-1">Sender: {message.from}</h5>
                                                <hr />
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Plot: {message.text}</h5>
                                                    <small className="text-muted">{message.text_date}</small>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                    :
                                    <h4>Нет переписки</h4>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Connection_admin
