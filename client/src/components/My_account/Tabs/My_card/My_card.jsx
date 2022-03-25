import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_card.css';
import visa from './visa.png';
import storeUsers from '../../../../store/storeUsers';
import storeCustomer from '../../../../store/storeCustomer';

const My_card = observer(() => {
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
                                <div className="right_part">Моя карта</div>
                            </div>
                            <form action="" className="add_card" onSubmit={(e) => storeCustomer.addCards(e, storeUsers.Account._id)}>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Введите название категории:' onInput={(e) => storeCustomer.setFormCard(e.target.value)} />
                                </div>
                                <button className="btn btn-success ">Добавить</button>
                            </form>
                            {
                                storeUsers.Account.cards.length == 0
                                    ?
                                    <h3 className='mt-3'>No cards registred</h3>
                                    :
                                    storeUsers.Account.cards.map((card, idx) => (
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="credit_card mt-5" key={idx}>
                                                <div className="d-flex flex-column">
                                                    <p className="bank">BANK OF AMERICA</p>
                                                    <div className="card_number text-center">{card}</div>
                                                    <img src={visa} alt="" className='pic' />
                                                </div>
                                            </div>
                                            <div className="ms-2">
                                                <button className="btn btn-danger" onClick={() => { storeCustomer.deleteCard(card) }}>Удалить</button>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default My_card
