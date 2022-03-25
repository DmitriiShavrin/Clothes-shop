import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './General_data.css';
import storeShops from '../../../../store/storeShops';


const General_data = observer(() => {
    return (
        <>
            <Navbar />
            <div className="my_account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-lg-8">
                            <h6 className="fw-bold inscription">Добавьте магазин</h6>
                            {!storeShops.modal
                                ?
                                <form action="" className="add_category" onSubmit={(e) => storeShops.create(e)}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите название магазина:' onInput={(e) => storeShops.setForm('title', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите адрес:' onInput={(e) => storeShops.setForm('adress', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите телефон:' onInput={(e) => storeShops.setForm('phone', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите е-мейл:' onInput={(e) => storeShops.setForm('email', e.target.value)} />
                                    </div>
                                    <button className="btn btn-success ">Добавить</button>
                                    <p className='mt-2 text-success'>{storeShops.notify}</p>
                                    <p className="mt-2 text-danger">{storeShops.error}</p>
                                </form>
                                :
                                <form action="" className="add_category" onSubmit={(e) => storeShops.updateShop(e, storeShops.model._id)}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите название магазина:' value={storeShops.model.title} onInput={(e) => storeShops.setForm('title', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите адрес:' value={storeShops.model.adress} onInput={(e) => storeShops.setForm('adress', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите телефон:' value={storeShops.model.phone} onInput={(e) => storeShops.setForm('phone', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите е-мейл:' value={storeShops.model.email} onInput={(e) => storeShops.setForm('email', e.target.value)} />
                                    </div>
                                    <button className="btn btn-success ">Обновить</button>
                                    <p className='mt-2 text-success'>{storeShops.notify}</p>
                                    <p className="mt-2 text-danger">{storeShops.error}</p>
                                </form>
                            }
                            <div className="list">
                                <h6 className="fw-bold inscription">Все магазины</h6>
                                <ol class="list-group list-group-numbered">
                                    {!storeShops.allShops.length
                                        ?
                                        <p className="text-danger">Магазины не созданы</p>
                                        :
                                        (
                                            storeShops.allShops.map((cat, idx) => (
                                                < li className="list-group-item d-flex bd-highlight align-items-center" key={idx}>
                                                    <div className="me-auto bd-highlight ms-3">{cat.title}</div>
                                                    <div className="bd-highlight">
                                                        <button type="button" className="btn btn-info" onClick={() => { storeShops.openUpdate(cat) }}>Изменить</button>
                                                        <button type="button" className="btn btn-danger ms-3" onClick={() => { storeShops.deleteShop(cat._id) }}>Удалить</button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default General_data
