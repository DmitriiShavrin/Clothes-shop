import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar_add_items/Sidebar_add_items';
import Navbar from '../../../Navbar/Navbar';
import './Add_items.css';
import storeCategory from '../../../../store/storeCategory';
import storeItems from '../../../../store/storeItems';


const Add_items = observer(() => {
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
                            <h6 className="fw-bold inscription mb-2">Добавьте товар</h6>
                            <form action="" className="add_category" onSubmit={(e) => { storeItems.create(e) }}>
                                <label for="basic-url" class="form-label mb-0">Название товара</label>
                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder='Введите название товара:' id='title' onInput={(e) => { storeItems.setFormItem('title', e.target.value) }} />
                                </div>
                                <label for="basic-url" class="form-label mb-0">Категория товара</label>
                                <select className="form-select mb-3" aria-label="Default select example" id="category_id" onChange={(e) => { storeItems.setFormItem('category_id', e.target.value) }}>
                                    {storeCategory.allCategories.map((cat, idx) => (
                                        <option key={idx} value={cat._id}>{cat.c_title}</option>
                                    ))}
                                </select>
                                <label for="basic-url" className="form-label mb-0">Стоимость товара</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Введите стоимость товара:' id="price" onInput={(e) => { storeItems.setFormItem('price', e.target.value) }} />
                                </div>
                                <div class="form-check form-switch mt-2 mb-2"> 
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => storeItems.openDiscount()} />
                                    <label class="form-check-label" for="flexSwitchCheckDefault">Скидка на товар</label>
                                </div>
                                {storeItems.if_discount
                                    ?
                                    <>
                                        <label for="basic-url" className="form-label mb-0">Скидку на товар</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder='Введите скидку на товар:' id="discount" onInput={(e) => { storeItems.setFormItem('discount', e.target.value) }} />
                                        </div>
                                    </>
                                    : null
                                }

                                <label for="basic-url" className="form-label mb-0">Комментарии к товару</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Введите комментарий к товару:' id="comment" onInput={(e) => { storeItems.setFormItem('comment', e.target.value) }} />
                                </div>
                                <label for="basic-url" className="form-label mb-0">Общие количество товара</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='Общие количество товара:' id="quantity" onInput={(e) => { storeItems.setFormItem('quantity', e.target.value) }} />
                                </div>
                                <label for="basic-url" className="form-label mb-0">Загрузите фото</label>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="photo" onChange={(e) => { storeItems.setFormItem('photo', e.target.files[0]) }} />
                                </div>
                                <button className="btn btn-success ">Добавить</button>
                                <p className='mt-2 text-success'>{storeItems.notify}</p>
                                <p className="mt-2 text-danger">{storeItems.error}</p>
                                {
                                    storeItems.img_min && storeItems.img_show
                                        ?
                                        <div class="card card_s my-5">
                                            <div className="d-flex justify-content-between align-items-center pe-2 ps-2">
                                                <h3>Preview</h3>
                                                <button type="button" class="btn-close" aria-label="Close" onClick={() => { storeItems.closeModal() }}></button>
                                            </div>
                                            <img src={storeItems.img_min} class="card-img-top" alt="..." />
                                        </div>
                                        :
                                        null
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Add_items
