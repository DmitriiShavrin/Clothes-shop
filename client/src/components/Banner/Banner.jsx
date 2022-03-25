import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import big_banner from './banner.gif';
import { observer } from 'mobx-react-lite';
import storeCategory from '../../store/storeCategory';
import storeBanner from '../../store/storeBanner';

const Banner = observer(() => {
    return (
        <>
            <div className="banner" style={{backgroundColor: storeBanner.currentBanner.background}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-img text-center">
                                <img src={`/img_banner/${storeBanner.currentBanner.photo}`} alt="" />
                            </div>
                            <div className="d-flex justify-content-center align-items-center banner-content">
                                {
                                    storeCategory.allCategories.map(
                                        cat => (
                                            <Link to={`/category/${cat.c_url}`}>
                                                <button className="btn-banner">{cat.c_title}</button>
                                            </Link>
                                        )
                                    )
                                }
                                {/* <Link to="/women">
                                    <button className="btn-banner">Женщины ></button>
                                </Link>
                                <Link to='/women_underwear'>
                                    <button className="btn-banner">Женское белье ></button>
                                </Link>
                                <Link to='/men'>
                                    <button className="btn-banner">Мужчины ></button>
                                </Link>
                                <Link to='/girls'>
                                    <button className="btn-banner">Девочки ></button>
                                </Link>
                                <Link to='/boys'>
                                    <button className="btn-banner">Мальчики ></button>
                                </Link>
                                <Link to='/kids'>
                                    <button className="btn-banner">Малыши ></button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Banner
