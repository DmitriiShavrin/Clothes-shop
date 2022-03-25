import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_credentials.css';
import storeCustomer from '../../../../store/storeCustomer';
import storeUsers from '../../../../store/storeUsers';


const My_credentials = observer(() => {
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
                                <div className="right_part">Мои данные</div>
                            </div>
                            <div className="list margin-top ">
                                <ol class="list-group list-group-numbered">
                                    <li className="list-group-item d-flex bd-highlight align-items-center">
                                        <div className="me-auto bd-highlight ms-3 d-flex flex-row align-items-center">
                                            <p className='mt-0 mb-0 me-2'>My name:</p>
                                            {
                                                storeCustomer.modal_name
                                                    ?
                                                    <>
                                                        <form action="" className="add_category d-flex mt-0 mb-0" onSubmit={(e) => storeCustomer.updateName(e, storeUsers.Account._id)}>
                                                            <input type="text" className="form-control mt-0 mb-0" placeholder='Введите новый name:' value={storeCustomer.model_name} onInput={(e) => storeCustomer.setFormName(e.target.value)} />
                                                            <button className="btn btn-success">Coхранить</button>
                                                        </form>
                                                    </>
                                                    :
                                                    <p className='mt-0 mb-0 fw-bold'>{storeUsers.Account.name}</p>
                                            }
                                        </div>
                                        <div className="bd-highlight">
                                            {
                                                !storeCustomer.modal_name
                                                    ?
                                                    <button type="button" className="btn btn-info" onClick={() => {
                                                        storeCustomer.openUpdateName()
                                                    }}>Изменить</button>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex bd-highlight align-items-center">
                                        <div className="me-auto bd-highlight ms-3 d-flex flex-row align-items-center">
                                            <p className='mt-0 mb-0 me-2'>My last name:</p>
                                            {
                                                storeCustomer.modal_last_name
                                                    ?
                                                    <>
                                                        <form action="" className="add_category d-flex mt-0 mb-0" onSubmit={(e) => storeCustomer.updateLastName(e, storeUsers.Account._id)}>
                                                            <input type="text" className="form-control mt-0 mb-0" placeholder='Введите новый last name:' value={storeCustomer.model_last_name} onInput={(e) => storeCustomer.setFormLastName(e.target.value)} />
                                                            <button className="btn btn-success">Coхранить</button>
                                                        </form>
                                                    </>
                                                    :
                                                    <p className='mt-0 mb-0 fw-bold'>{storeUsers.Account.last_name}</p>
                                            }
                                        </div>
                                        <div className="bd-highlight">
                                            {
                                                !storeCustomer.modal_last_name
                                                    ?
                                                    <button type="button" className="btn btn-info" onClick={() => {
                                                        storeCustomer.openUpdateLastName()
                                                    }}>Изменить</button>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex bd-highlight align-items-center">
                                        <div className="me-auto bd-highlight ms-3 d-flex flex-row align-items-center">
                                            <p className='mt-0 mb-0 me-2'>My paternal:</p>
                                            {
                                                storeCustomer.modal_paternal
                                                    ?
                                                    <>
                                                        <form action="" className="add_category d-flex mt-0 mb-0" onSubmit={(e) => storeCustomer.updatePaternal(e, storeUsers.Account._id)}>
                                                            <input type="text" className="form-control mt-0 mb-0" placeholder='Введите новый paternal:' value={storeCustomer.model_paternal} onInput={(e) => storeCustomer.setFormPaternal(e.target.value)} />
                                                            <button className="btn btn-success">Coхранить</button>
                                                        </form>
                                                    </>
                                                    :
                                                    <p className='mt-0 mb-0 fw-bold'>{storeUsers.Account.paternal}</p>
                                            }
                                        </div>
                                        <div className="bd-highlight">
                                            {
                                                !storeCustomer.modal_paternal
                                                    ?
                                                    <button type="button" className="btn btn-info" onClick={() => {
                                                        storeCustomer.openUpdatePaternal()
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

export default My_credentials
