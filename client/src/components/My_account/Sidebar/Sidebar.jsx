import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './Sidebar.css';
import storeUsers from '../../../store/storeUsers';

const Sidebar = observer(() => {
    return (
        <>
            <div className="sidebar d-flex flex-column">
                <div className="greating">Здравствуйте, {storeUsers.Account.name}!</div>
                <div className="links_sidebar d-flex flex-column">
                    <Link to="/my_purchases" className="link_sidebar">Мои покупки</Link>
                    <Link to="/my_favorites" className="link_sidebar">Избранные товары</Link>
                    <Link to="/my_login_password" className="link_sidebar">Логин и пароль</Link>
                    <Link to="/my_credentials" className="link_sidebar">Мои данные</Link>
                    <Link to="/my_card" className="link_sidebar">Моя карта</Link>
                    <Link to="/my_networks" className="link_sidebar">Социальные сети</Link>
                    <Link to="/connection" className="link_sidebar">Обратная связь</Link>
                </div>
                <div className="">
                    <button className="exit" onClick={()=>{storeUsers.logout()}}>Выйти</button>
                </div>
            </div>
        </>
    )
})

export default Sidebar
