import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './Sidebar_add_items.css';
import storeUsers from '../../../store/storeUsers';

const Sidebar = observer(() => {

    const { pathname } = useLocation();

    return (
        <>
            <div className="sidebar d-flex flex-column">
                <div className="greating">Здравствуйте, {storeUsers.Account.name}!</div>
                <div className="links_sidebar d-flex flex-column">
                    <Link to="/all_items" className={`link_sidebar ${ pathname == '/all_items' ? 'text-warning' : '' }`}>Все товары</Link>
                    <Link to="/all_items"  className={`link_sidebar_red ${ pathname == '/all_items' ? 'text-warning' : '' }`}>Все товары</Link>
                    <Link to="/add_items" className={`link_sidebar_red ${ pathname == '/add_items' ? 'text-warning' : '' }`}>Добавить товары</Link>
                    <Link to="/add_category" className={`link_sidebar ${ pathname == '/add_category' ? 'text-warning' : '' }`}>Категории</Link>
                    <Link to="/solt_out_items" className={`link_sidebar ${ pathname == '/solt_out_items' ? 'text-warning' : '' }`}>Проданные товары</Link>
                    <Link to="/change_banner" className={`link_sidebar ${ pathname == '/change_banner' ? 'text-warning' : '' }`}>Поменять баннер</Link>
                    <Link to="/users" className={`link_sidebar ${ pathname == '/users' ? 'text-warning' : '' }`}>Пользователи</Link>
                    <Link to="/connection_admin" className={`link_sidebar ${ pathname == '/connection_admin' ? 'text-warning' : '' }`}>Обратная связь</Link>
                    <Link to="/general_data" className={`link_sidebar ${ pathname == '/general_data' ? 'text-warning' : '' }`}>Магазины</Link>
                </div>
                <div className="">
                    <button className="exit" onClick={()=>{storeUsers.logout()}}>Выйти</button>
                </div>
            </div>
        </>
    )
})

export default Sidebar
