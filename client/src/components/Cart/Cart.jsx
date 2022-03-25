import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Navbar from '../Navbar/Navbar';
import './Cart.css';
import storeCart from '../../store/storeCart';
import storeUsers from '../../store/storeUsers';
import storeCustomer from '../../store/storeCustomer';

const Cart = observer(() => {

    useEffect(() => {
        storeCart.getCart()


    }, [])


    return (
        <>
            <Navbar />
            <div className="mt-2">
                <div className="container pos_rel">
                    <div className="fraim d-flex justify-content-center align-items-center mb-3">
                        <div className="logo text-center">Корзина</div>
                        <i class="fas fa-heart"></i>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <ol className="list-group list-group-numbered">
                                {
                                    !storeCart.items_in_cart.length
                                        ?
                                        <div className="">У Вас нет ничего в корзине</div>
                                        :
                                        <>
                                            {storeCart.items_in_cart.map((itm, idx) => (
                                                < li className="list-group-item d-flex bd-highlight align-items-center" key={idx}>
                                                    <img src={`/img/${itm.photo}`} alt="" width="100px" className="ms-2" />
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center me-auto">
                                                        <div className="me-auto bd-highlight ms-3">Название: {itm.title}</div>
                                                        {
                                                            !itm.discount == 0
                                                                ?
                                                                <>
                                                                    <div className="fw-bold text-decoration-line-through">{itm.price} РУБ</div>
                                                                    <div className="fw-bold ms-2 text-danger">{itm.discount} РУБ</div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="me-auto bd-highlight ms-3">Цена за 1 шт: {itm.price} РУБ</div>
                                                                    <div className="me-auto bd-highlight ms-3">Цена за все: {itm.price * itm.count} РУБ</div>
                                                                </>
                                                        }
                                                        <input type="number" className="me-auto bd-highlight ms-3 inputPrice" min='1' max={itm.quantity} value={itm.count} onChange={(e) => storeCart.changeCount(idx, e.target.value)}></input>
                                                        <div className="heart" >
                                                            {
                                                                storeUsers.Account
                                                                    ?
                                                                    <i className={`${storeUsers.Account.favorite.find(el => el == itm._id) ? "fas fa-heart" : "far fa-heart"}`} onClick={() => { storeCustomer.addToFavorite(itm._id) }}></i>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="bd-highlight">
                                                        <button type="button" className="btn btn-danger ms-3"
                                                            onClick={() => { storeCart.removeItem(idx) }}
                                                        >Удалить</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                }
                            </ol>
                        </div>
                        <div className="col-lg-4">
                            <div class="card">
                                <h5 class="card-header">Покупки</h5>
                                <div class="card-body">
                                    <h5 class="card-title mb-2">Всего в вашей корзине:</h5>
                                    {!storeCart.items_in_cart.length
                                        ?
                                        <h5>У Вас нет покупок</h5>
                                        :
                                        <>
                                            <ol className="list-group list-group-numbered">
                                                {storeCart.items_in_cart.map((itm, idx) => (
                                                    <li className="list-group-item border_zero d-flex bd-highlight align-items-center" key={idx}>{itm.title}</li>
                                                ))}
                                            </ol>
                                            <h5 class="mb-3">На сумму: {storeCart.total.toLocaleString()} РУБ</h5>
                                            <p class="card-text">Чтобы перейти в оформлению заказа нажмите на кнопку</p>
                                            <button class="btn btn-primary" onClick={() => { storeCart.openOrder() }}>Оформить заказ</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        storeCart.modal
                            ?
                            <>
                                <div className="card cards-absolute">
                                    <div className="card-header ">
                                        <h5 className='fw-bold'>Оформление заказа</h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => { storeCart.makeOrder(e) }}>
                                            <p className="card-text mb-2">В Вашем заказе следующие позиции</p>
                                            {
                                                storeCart.order.items.map((itm, idx) => (
                                                    <p className="card-text ms-2 mt-0 mb-0" key={idx}> {itm.title} - {itm.count} шт.</p>
                                                ))
                                            }
                                            <p className="card-text mt-2 mb-2">Ваше имя: {storeUsers.Account ? storeCart.order.user_name :
                                                <input type='text' class="form-control" placeholder="Ваше имя" onInput={(e) => { storeCart.setFormOrder('user_name', e.target.value) }} />
                                            }</p>
                                            <p className="card-text mt-2 mb-2">Адрес доставки</p>
                                            <input type='text' className="form-control w-100" placeholder="Адрес доставки" onInput={(e) => { storeCart.setFormOrder('adress', e.target.value) }} />
                                            <p className="card-text mt-2 mb-2">Способ оплаты</p>
                                            <div class="form-check form-switch mt-2 mb-2">
                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => storeCart.payByCash(e.target.checked)} />
                                                <label class="form-check-label" for="flexSwitchCheckDefault">Картой</label>
                                            </div>
                                            <h5 class="mt-2 mb-2">На сумму: {storeCart.order.total.toLocaleString()} РУБ</h5>
                                            <div className="d-flex justify-content-around">
                                                <button href="#" className="btn btn-primary">Совершить</button>
                                                <button href="#" className="btn btn-danger" onClick={() => { storeCart.closeOrderMenu() }}>Отменить</button>
                                            </div>
                                        </form>
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

export default Cart
