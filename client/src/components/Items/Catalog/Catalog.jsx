import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Navbar from '../../Navbar/Navbar';
import './Catalog.css';
import storeItems from '../../../store/storeItems';
import storeCustomer from '../../../store/storeCustomer';
import storeUsers from '../../../store/storeUsers';
import storeCart from '../../../store/storeCart';
import storeFilter from '../../../store/storeFilter';
import Config from '../../../config';

const Catalog = observer(() => {

    const { c_url } = useParams();

    useEffect(() => {
        if (Config.searchText == '') {
            storeItems.getData(c_url);
        }
        console.log('spin', storeItems.spin);
    });

    return (
        <>
            <Navbar />
            <div className="womens">
                <div className="container">
                    {storeItems.spin ?
                        <div className="py-5 text-center">
                            <img src="/spin.svg" width="70px" alt="" />
                        </div>
                        :
                        <div className="row">
                            <div className="col-lg-12 text-center name">
                                <h4>{Config.searchText == '' ? storeItems.name_of_category : 'Result search'}</h4>
                            </div>
                            <div className="col-lg-12 col-sm-12 col-md-4">
                                {!storeItems.allItems.length
                                    ?
                                    <p className="text-danger">Товаров нет</p>
                                    :
                                    (
                                        <div className='d-flex justify-content-between flex-wrap'>
                                            {
                                                storeItems.allItems.map((itm, idx) => (
                                                    <div className="supply_card mb-4" key={idx}>
                                                        <div className="supply_card_img">
                                                            <img src={`/img/${itm.photo}`} alt="" />
                                                        </div>
                                                        <div className="heart" >
                                                            {
                                                                storeUsers.Account
                                                                    ?
                                                                    <i className={`${storeUsers.Account.favorite.find(el => el == itm._id) ? "fas fa-heart" : "far fa-heart"}`} onClick={() => { storeCustomer.addToFavorite(itm._id) }}></i>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                        <div className="cart">
                                                            <i class="fas fa-cart-plus" onClick={() => { storeCart.addToCart(itm) }}></i>
                                                        </div>
                                                        {!itm.comment == ''
                                                            ?
                                                            <div className="supply_card_status d-lg-block">
                                                                <h7>{itm.comment}</h7>
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                        <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                            <h6>{itm.title}</h6>
                                                            {
                                                                !itm.discount == 0
                                                                    ?
                                                                    <div className="d-flex align-items-center">
                                                                        <h5 className="fw-bold text-decoration-line-through">{itm.price} РУБ</h5>
                                                                        <h5 className="fw-bold ms-2 text-danger">{itm.discount} РУБ</h5>
                                                                    </div>
                                                                    :
                                                                    <h5 className="fw-bold">{itm.price} РУБ</h5>
                                                            }

                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
})

export default Catalog
