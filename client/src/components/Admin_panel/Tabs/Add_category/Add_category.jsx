import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Add_category.css';
import StoreCategory from '../../../../store/storeCategory';

const Add_category = observer(() => {
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
                            <h6 className="fw-bold inscription">Добавьте категорию</h6>
                            {!StoreCategory.modal
                                ?
                                <form action="" className="add_category" onSubmit={(e) => StoreCategory.create(e)}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите название категории:' onInput={(e) => StoreCategory.setForm('c_title', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите URL категории:' onInput={(e) => StoreCategory.setForm('c_url', e.target.value)} />
                                    </div>
                                    <button className="btn btn-success ">Добавить</button>
                                    <p className='mt-2 text-success'>{StoreCategory.notify}</p>
                                    <p className="mt-2 text-danger">{StoreCategory.error}</p>
                                </form>
                                :
                                <form action="" className="add_category" onSubmit={(e) => StoreCategory.updateCategory(e, StoreCategory.model._id)}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={StoreCategory.model.c_title} onInput={(e) => StoreCategory.setForm('c_title', e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder='Введите URL категории:' value={StoreCategory.model.c_url} onInput={(e) => StoreCategory.setForm('c_url', e.target.value)} />
                                    </div>
                                    <button className="btn btn-success ">Обновить</button>
                                    <p className='mt-2 text-success'>{StoreCategory.notify}</p>
                                </form>
                            }
                            <div className="list">
                                <h6 className="fw-bold inscription">Все категории</h6>
                                <ol class="list-group list-group-numbered">
                                    {!StoreCategory.allCategories.length
                                        ?
                                        <p className="text-danger">Категориии не созданы</p>
                                        :
                                        (
                                            StoreCategory.allCategories.map((cat, idx) => (
                                                < li className="list-group-item d-flex bd-highlight align-items-center" key={idx}>
                                                    <div className="me-auto bd-highlight ms-3">{cat.c_title}</div>
                                                    <div className="bd-highlight">
                                                        <button type="button" className="btn btn-info" onClick={() => { StoreCategory.openUpdate(cat) }}>Изменить</button>
                                                        <button type="button" className="btn btn-danger ms-3" onClick={() => { StoreCategory.deleteCategory(cat._id) }}>Удалить</button>
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

export default Add_category
