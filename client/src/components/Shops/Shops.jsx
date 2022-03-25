import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Shops.css';
import { observer } from 'mobx-react-lite';
import storeShops from '../../store/storeShops';

const Shops = observer(() => {
    return (
        <>
            <Navbar />
            <div className="shops">
                <div className="container">
                    <h5 className="text-center">Наши магазины</h5>
                    <div className="city_log">
                        {storeShops.allShops.length
                            ?
                            (
                                storeShops.allShops.map((shop, idx) => (
                                    <div key={idx}>
                                        <div className="city">{shop.title}</div>
                                        <div className="city_credits">
                                            <div className="mb-4 mt-4 fw-bold">{shop.adress}</div>
                                            <div>Адрес: {shop.adress}</div>
                                            <div>Телефон: {shop.phone}</div>
                                            <div>Email: {shop.email}</div>
                                        </div>
                                    </div>
                                ))
                            )
                            :
                            (
                                <h4>No shops</h4>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
})

export default Shops
