import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Solt_out_items.css';
import storeCart from '../../../../store/storeCart';
import storeUsers from '../../../../store/storeUsers';


const Solt_out_items = observer(() => {
    return (
        <>
            <Navbar />
            <div className="my_account">
                <div className="container pos_rel">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="right_part">Проданные товары</div>
                            </div>
                            <div className="list mt-4">
                                <ol className="list-group list-group-numbered">
                                    {!storeCart.allPurchases.length
                                        ?
                                        <p className="text-danger">Нет проданных товаров</p>
                                        :
                                        (
                                            storeCart.allPurchases.map((itm, idx) => (
                                                < li className="list-group-item d-flex bd-highlight align-items-center" key={idx}>
                                                    <div className="me-auto bd-highlight ms-3">Date: {itm.date} / Number of items: {itm.items.length} / Total: {itm.total.toLocaleString()}</div>
                                                    <div className="bd-highlight">
                                                        <button type="button" className="btn btn-info" onClick={() => { storeCart.openTheSoldItem(itm) }}>Открыть</button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    }
                                </ol>
                            </div>
                            <h5 className='mt-4'>Всего заработано: {storeCart.total_final.toLocaleString()} РУБ</h5>
                        </div>
                    </div>
                    {
                        storeCart.modal
                            ?
                            <>
                                <div className="card cards-absolute">
                                    <div className="card-header d-flex">
                                        <h5 className='fw-bold me-auto'>Заказ №{storeCart.sold_model._id}</h5>
                                        <button type="button" class="btn-close" aria-label="Close" onClick={() => { storeCart.closeTheSoldItem() }}></button>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text mb-2">Заказ был выполнен: {storeCart.sold_model.date}</p>
                                        <p className="card-text mb-2">Заказ был куплен: {storeCart.sold_model.username}</p>
                                        <p className="card-text mb-2">Были куплены следующие товары:</p>
                                        <ol className="list-group list-group-numbered">
                                            {
                                                storeCart.sold_model.items.map((itm, idx) => (
                                                    <li className="list-group-item d-flex bd-highlight align-items-center border_zero" key={idx}>
                                                        <p className="card-text ms-2 mt-0 mb-0"> {itm.title} - {itm.count} шт.</p>
                                                    </li>

                                                ))
                                            }
                                        </ol>
                                        <p className="card-text mt-3">Сумма заказа: {storeCart.sold_model.total.toLocaleString()} РУБ</p>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
})

export default Solt_out_items
