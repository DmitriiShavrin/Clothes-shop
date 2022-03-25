import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
// Main
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Shops from './components/Shops/Shops'
import Favorites from './components/Fovorites/Favorites';
import Cart from './components/Cart/Cart';

// Account
import My_account from './components/My_account/Tabs/My_account/My_account';
import Connection from './components/My_account/Tabs/Connection/Connection';
import My_card from './components/My_account/Tabs/My_card/My_card';
import My_credentials from './components/My_account/Tabs/My_credentials/My_credentials';
import My_favorites from './components/My_account/Tabs/My_favorites/My_favorites';
import My_login_password from './components/My_account/Tabs/My_login_password/My_login_password';
import My_networks from './components/My_account/Tabs/My_networks/My_networks';
import My_purchases from './components/My_account/Tabs/My_purchases/My_purchases';
// Admin 
import Add_items from './components/Admin_panel/Tabs/Add_items/Add_items';
import All_items from './components/Admin_panel/Tabs/All_items/All_items';
import Change_banner from './components/Admin_panel/Tabs/Change_banner/Change_banner';
import Connection_admin from './components/Admin_panel/Tabs/Connection_admin/Connection_admin';
import Discounts from './components/Admin_panel/Tabs/Discounts/Discounts';
import General_data from './components/Admin_panel/Tabs/General_data/General_data';
import Solt_out_items from './components/Admin_panel/Tabs/Solt_out_items/Solt_out_items';
import Users from './components/Admin_panel/Tabs/Users/Users';
import Add_category from './components/Admin_panel/Tabs/Add_category/Add_category';
// Store
import storeUsers from './store/storeUsers';

//New
import Catalog from './components/Items/Catalog/Catalog';

function App() {
    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/shops' element={<Shops />} />
                    <Route path='/favorite' element={<Favorites />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/category/:c_url' element={<Catalog />} />
                    {/* Мой аккаунт */}
                    {storeUsers.Account?.role == 'USER' ?
                        <>
                            <Route path='/my_account' element={<My_account />} />
                            <Route path='/connection' element={<Connection />} />
                            <Route path='/my_card' element={<My_card />} />
                            <Route path='/my_credentials' element={<My_credentials />} />
                            <Route path='/my_favorites' element={<My_favorites />} />
                            <Route path='/my_login_password' element={<My_login_password />} />
                            <Route path='/my_networks' element={<My_networks />} />
                            <Route path='/my_purchases' element={<My_purchases />} />
                        </>
                        :
                        null
                    }
                    {/* Админ панель */}
                    {storeUsers.Account?.role == 'ADMIN' ?
                        <>
                            <Route path='/all_items' element={<All_items />} />
                            <Route path='/add_items' element={<Add_items />} />
                            <Route path='/solt_out_items' element={<Solt_out_items />} />
                            <Route path='/change_banner' element={<Change_banner />} />
                            <Route path='/discounts' element={<Discounts />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/connection_admin' element={<Connection_admin />} />
                            <Route path='/general_data' element={<General_data />} />
                            <Route path='/add_category' element={<Add_category />} />
                        </>
                        :
                        null
                    }
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default observer(App);


