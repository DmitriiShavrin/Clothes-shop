import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { observer } from 'mobx-react-lite';
import storeUsers from '../../store/storeUsers';
import storeCategory from '../../store/storeCategory';
import storeFilter from '../../store/storeFilter';
import Config from '../../config';

const Navbar = observer(() => {



    return (
        <>
            <div className="main_navbar">
                <div className="top-h">
                    <div className="container">
                        <div className="row">
                            <div className="col lg-12">
                                <div className="text-center">
                                    <div className="upper_state">Закажите доставку с примеркой в наши магазины с примеркой. <Link to='/#'>Подробнее</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle-h">
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-between align-items-center">
                                <div className="logo">
                                    <Link to="/"><i class="fab fa-shopify"></i></Link>
                                </div>
                                <form className="middle-h-input" onSubmit={(e) => storeFilter.search(e)}>
                                    <input type="text" id="search_inp" placeholder="Поиск по артикулу" onInput={(e) => storeFilter.setSearch(e.target.value)} />
                                    <i class="fas fa-search search"></i>
                                </form>
                                <div className="links d-flex align-items-center">
                                    <div className="d-flex flex-column align-items-center link">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <Link to="/shops">Магазины</Link>
                                    </div>
                                    <div className="d-flex flex-column align-items-center link">
                                        <i class="fas fa-user"></i>
                                        {!storeUsers.Account ? <Link to="/login">Войти</Link> : (storeUsers.Account.role == "ADMIN" ? <Link to="/all_items">Кабинет</Link> : <Link to="/my_account">Кабинет</Link>)
                                        }
                                    </div>
                                    <div className="d-flex flex-column align-items-center link">
                                        <i class="fas fa-heart"></i>
                                        <Link to="/favorite">Избранное</Link>
                                    </div>
                                    <div className="d-flex flex-column align-items-center link">
                                        <i class="fas fa-shopping-cart"></i>
                                        <Link to="/cart">Моя корзина</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="down-h">
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="nav d-flex justify-content-between align-items-center">
                                    <Link to='/' class="refer">Скидки</Link>
                                    {
                                        storeCategory.allCategories.map((cat) => (
                                            <Link to={`/category/${cat.c_url}`} className="refer">{cat.c_title}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
})

export default Navbar
