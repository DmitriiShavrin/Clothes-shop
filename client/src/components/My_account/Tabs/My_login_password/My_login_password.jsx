import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_login_password.css';
import storeUsers from '../../../../store/storeUsers';
import storeCustomer from '../../../../store/storeCustomer';


const My_login_password = observer(() => {
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
                                <div className="right_part">Мои пароль и логин</div>
                            </div>
                            <div className="list margin-top ">
                                <ol class="list-group list-group-numbered">
                                    <li className="list-group-item d-flex bd-highlight align-items-center">
                                        <div className="me-auto bd-highlight ms-3 d-flex flex-row align-items-center">
                                            <p className='mt-0 mb-0 me-2'>My login:</p>
                                            {
                                                storeCustomer.modal_login
                                                    ?
                                                    <>
                                                        <form action="" className="add_category d-flex mt-0 mb-0" onSubmit={(e) => storeCustomer.updateLogin(e, storeUsers.Account._id)}>
                                                            <input type="text" className="form-control mt-0 mb-0" placeholder='Введите новый login:' value={storeCustomer.model_login} onInput={(e) => storeCustomer.setFormLogin(e.target.value)} />
                                                            <button className="btn btn-success">Coхранить</button>
                                                        </form>
                                                    </>
                                                    :
                                                    <p className='mt-0 mb-0 fw-bold'>{storeUsers.Account.email}</p>
                                            }
                                        </div>
                                        <div className="bd-highlight">
                                            {
                                                !storeCustomer.modal_login
                                                    ?
                                                    <button type="button" className="btn btn-info" onClick={() => {
                                                        storeCustomer.openUpdateLogin()
                                                    }}>Изменить</button>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex bd-highlight align-items-center">
                                        <div className="me-auto bd-highlight ms-3 d-flex flex-row align-items-center">
                                            <p className='mt-0 mb-0 me-2'>My password:</p>
                                            {
                                                storeCustomer.modal_pass
                                                    ?
                                                    <>
                                                        <form action="" className="add_category d-flex mt-0 mb-0" onSubmit={(e) => storeCustomer.updatePass(e, storeUsers.Account._id)}>
                                                            <input type="text" className="form-control mt-0 mb-0" placeholder='Введите новый password:' value={storeCustomer.model_pass} onInput={(e) => storeCustomer.setFormPass(e.target.value)} />
                                                            <button className="btn btn-success">Coхранить</button>
                                                        </form>
                                                    </>
                                                    :
                                                    <p className='mt-0 mb-0 fw-bold'>{storeUsers.Account.pass}</p>
                                            }
                                        </div>
                                        <div className="bd-highlight">
                                            {
                                                !storeCustomer.modal_pass
                                                    ?
                                                    <button type="button" className="btn btn-info" onClick={() => {
                                                        storeCustomer.openUpdatePass()
                                                    }}>Изменить</button>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default My_login_password
