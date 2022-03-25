import React from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import './BigCards.css';
import card1 from './bigcard1.avif'
import card2 from './bigcard2.avif'
import card3 from './bigcard3.avif'
import suit1 from './suit1.jpg';
import suit2 from './suit2.jpg';
import suit3 from './suit3.jpg';
import suit4 from './suit4.jpg';
import { observer } from 'mobx-react-lite';
import storeItems from '../../store/storeItems';

const BigCards = observer(() => {

    function initNewSlider() {
        setTimeout(() => {
            $('#slider_nevers').slick({
                slidesToShow: 4,
                dots: true,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 574,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 399,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            })
        })
    }


    return (
        <>
            <div className="bigCards">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="">
                                    <img src={card1} alt="" />
                                </div>
                                <h4 className="text-center">Идеи подарков</h4>
                                <div className="text-center">
                                    <button className="btn-card">Девочки</button>
                                    <button className="btn-card">Мальчики</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="">
                                    <img src={card2} alt="" />
                                </div>
                                <h4 className="text-center">Идеи подарков</h4>
                                <div className="text-center">
                                    <button className="btn-card">Девочки</button>
                                    <button className="btn-card">Мальчики</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="">
                                    <img src={card3} alt="" />
                                </div>
                                <h4 className="text-center">Идеи подарков</h4>
                                <div className="text-center">
                                    <button className="btn-card">Девочки</button>
                                    <button className="btn-card">Мальчики</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new_supply">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h4>Новинки недели</h4>
                            </div>
                            {/* SLIDER */}
                            <div id="slider_nevers" className='px-4'>
                                {
                                    storeItems.newItems.length
                                        ?
                                        <>
                                            {storeItems.newItems.map((slide) => (
                                                <div className="col-lg-3 col-sm-12 col-md-6" key={slide._id}>
                                                    <div className="supply_card mx-3" >
                                                        <div className="supply_card_img">
                                                            <img src={`img/${slide.photo}`} alt="" />
                                                        </div>
                                                        <div className="supply_card_status d-lg-block">
                                                            <h6>{slide.comment}</h6>
                                                        </div>
                                                        <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                            <h6>{slide.title}</h6>
                                                            <h5 className="fw-bold">{slide.price} РУБ</h5>
                                                        </div>
                                                    </div>

                                                </div>
                                            ), initNewSlider())

                                            }
                                        </>
                                        :
                                        <>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit1} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h6>Только на сайте</h6>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit2} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h6>Только на сайте</h6>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit3} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h7>Только на сайте</h7>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit4} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h6>Только на сайте</h6>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit4} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h6>Только на сайте</h6>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-12 col-md-6">
                                                <div className="supply_card mx-3">
                                                    <div className="supply_card_img">
                                                        <img src={suit4} alt="" />
                                                    </div>
                                                    <div className="supply_card_status d-lg-block">
                                                        <h6>Только на сайте</h6>
                                                    </div>
                                                    <div className="supply_card_info d-flex flex-column justify-content-center align-items-center">
                                                        <h6>Блейзер</h6>
                                                        <h5 className="fw-bold">3000 РУБ</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default BigCards
