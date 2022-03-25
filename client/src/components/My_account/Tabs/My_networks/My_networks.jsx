import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_networks.css';
import storeUsers from '../../../../store/storeUsers';
import storeCustomer from '../../../../store/storeCustomer';

const My_networks = observer(() => {
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
                                <div className="right_part">Мои социальные сети</div>
                            </div>
                            <form action="" className="add_card"
                                onSubmit={(e) => storeCustomer.addSocialNetwork(e, storeUsers.Account._id)}
                            >
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Введите название соц сети:'
                                        onInput={(e) => storeCustomer.setFormNetwork('title', e.target.value)}
                                    />

                                </div>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Введите название id сети:'
                                        onInput={(e) => storeCustomer.setFormNetwork('account', e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success ">Добавить</button>
                            </form>
                            <div className="mt-4">
                                {
                                    storeUsers.Account.social_media.length
                                        ?
                                        <>
                                            <ol class="list-group list-group-numbered">
                                                {
                                                    storeUsers.Account.social_media.map((soc, idx) => (
                                                        <li class="list-group-item d-flex justify-content-between align-items-start align-items-center" key={idx}>
                                                            <div className="me-auto">
                                                                {soc.title} - {soc.account}
                                                            </div>
                                                            <button className='btn btn-info' onClick={() => { storeCustomer.deleteNetwork(soc) }}>Удалить</button>
                                                        </li>
                                                    ))
                                                }
                                            </ol>
                                        </>
                                        :
                                        <h4>Социальные сети не добавлены</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default My_networks
