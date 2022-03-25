import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { observer } from 'mobx-react-lite';
import './Favorites.css';
import storeCustomer from '../../store/storeCustomer';
import storeItems from '../../store/storeItems';
import storeUsers from '../../store/storeUsers';
import storeCart from '../../store/storeCart';

const Favorites = observer(() => {

    return (
        <>
            <Navbar />
            <div className="mt-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fraim d-flex justify-content-center align-items-center mb-3">
                                <div className="logo text-center">Избранные товары</div>
                                <i class="fas fa-heart"></i>
                            </div>
                            {
                                !storeCustomer.myFavorites
                                    ?
                                    <div className="">У Вас нет избранных товаров</div>
                                    :
                                    <>
                                        <div className='d-flex justify-content-between flex-wrap'>
                                            {
                                                storeCustomer.myFavorites.map((itm, idx) => (
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
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Favorites
