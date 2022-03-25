import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_purchases';
import storeCustomer from '../../../../store/storeCustomer';


const My_purchases = observer(() => {

    useEffect(() => {
        storeCustomer.getMyPurchases()
    }, [])

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
                                <div className="right_part">Мои покупки</div>
                            </div>
                            <div className="list mt-4">
                                <ol className="list-group list-group-numbered">
                                    {!storeCustomer.myPurchases.length
                                        ?
                                        <p className="text-danger">Нет проданных товаров</p>
                                        :
                                        (
                                            storeCustomer.myPurchases.map((itm, idx) => (
                                                < li className="list-group-item d-flex bd-highlight align-items-center" key={idx}>
                                                    <div className="me-auto bd-highlight ms-3">Date: {itm.date} / Number of items: {itm.items.length} / Total: {itm.total.toLocaleString()}</div>
                                                    <div className="bd-highlight">
                                                        <button type="button" className="btn btn-info"
                                                            onClick={() => { storeCustomer.openTheSoldItem(itm) }}
                                                        >Открыть</button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                    {
                        storeCustomer.modal
                            ?
                            <>
                                <div className="card cards-absolute">
                                    <div className="card-header d-flex">
                                        <h5 className='fw-bold me-auto'>Заказ №{storeCustomer.sold_model._id}</h5>
                                        <button type="button" class="btn-close" aria-label="Close" onClick={() => { storeCustomer.closeTheSoldItem() }}></button>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text mb-2">Заказ был выполнен: {storeCustomer.sold_model.date}</p>
                                        <p className="card-text mb-2">Были куплены следующие товары:</p>
                                        <ol className="list-group list-group-numbered">
                                            {
                                                storeCustomer.sold_model.items.map((itm, idx) => (
                                                    <li className="list-group-item d-flex bd-highlight align-items-center border_zero" key={idx}>
                                                        <p className="card-text ms-2 mt-0 mb-0"> {itm.title} - {itm.count} шт.</p>
                                                    </li>

                                                ))
                                            }
                                        </ol>
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

export default My_purchases
