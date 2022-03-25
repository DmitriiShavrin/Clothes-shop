import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar_add_items/Sidebar_add_items';
import Navbar from '../../../Navbar/Navbar';
import './All_items.css';
import storeItems from '../../../../store/storeItems';
import DataTable from 'react-data-table-component';
import { Checkbox, FontIcon } from 'react-md';
import storeCategory from '../../../../store/storeCategory';


const All_items = observer(() => {

    useEffect(() => {
        storeItems.getItems();
    }, []);

    let n = 1;

    let columns = [
        {
            name: '#',
            selector: (row) => <>{n++}</>
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Category',
            selector: 'category_title',
            sortable: true,
            right: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            right: true,
        },
        {
            name: 'Discount',
            selector: 'discount',
            sortable: true,
            right: true,
        },
        {
            name: 'Comment',
            selector: 'comment',
            sortable: true,
            right: true,
        },
        {
            name: 'Quantity',
            selector: 'quantity',
            sortable: true,
            right: true,
        },
        {
            name: 'Edit',
            selector: (row) => <><button className="btn btn-success" onClick={() => storeItems.openUpdate(row)}>Edit</button></>
        },
        {
            name: 'Del',
            selector: (row) => <><button className="btn btn-danger" onClick={() => { storeItems.deleteItem(row._id) }}>Edit</button></>
        },
        {
            name: 'New',
            selector: (row) => <><button className={`${row.new ? "btn btn-warning" : "btn btn-info"}`} onClick={() => {
                if (row.new) {
                    storeItems.noNewItem(row._id)
                } else {
                    storeItems.newItem(row._id)
                }
            }}>{row.new ? 'New' : 'Not new'}</button></>
        }
    ];

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
                            <h6 className="fw-bold inscription mb-4">Все товары</h6>
                            <DataTable
                                columns={columns}
                                data={storeItems.allItems}
                                pagination={true}
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                                fixedHeader
                            />
                            {storeItems.edit_card_show
                                ?
                                <>
                                    <div className="edit_card">
                                        <div class="card card_s my-5">
                                            <div className="d-flex justify-content-between align-items-center pe-2 ps-2">
                                                <h3>Update item</h3>
                                                <button type="button" class="btn-close" aria-label="Close" onClick={() => { storeItems.closeModalEdit() }}></button>
                                            </div>

                                            <form action="" className="add_category" onSubmit={(e) => { storeItems.updateItem(e, storeItems.model._id) }}>
                                                <img src={storeItems.img_min ? storeItems.img_min : `/img/${storeItems.model.photo}`} class="card-img-top" alt="..." />
                                                <label for="basic-url" class="form-label mb-0">Название товара</label>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" value={storeItems.model.title} placeholder='Введите название товара:' id='title' onInput={(e) => { storeItems.setFormItem('title', e.target.value) }} />
                                                </div>
                                                <label for="basic-url" class="form-label mb-0">Категория товара</label>
                                                <select className="form-select mb-3" aria-label="Default select example" id="category_id" onChange={(e) => { storeItems.setFormItem('category_id', e.target.value) }}>
                                                    {storeCategory.allCategories.map((cat, idx) => (
                                                        <option key={idx} value={cat.c_title}>{cat.c_title}</option>
                                                    ))}
                                                </select>
                                                <label for="basic-url" className="form-label mb-0">Стоимость товара</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder='Введите стоимость товара:' value={storeItems.model.price} id="price" onInput={(e) => { storeItems.setFormItem('price', e.target.value) }} />
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
                                                            <input type="text" className="form-control" placeholder='Введите скидку на товар:' value={storeItems.model.discount} id="discount" onInput={(e) => { storeItems.setFormItem('discount', e.target.value) }} />
                                                        </div>
                                                    </>
                                                    : null
                                                }

                                                <label for="basic-url" className="form-label mb-0">Комментарии к товару</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder='Введите комментарий к товару:' value={storeItems.model.comment} id="comment" onInput={(e) => { storeItems.setFormItem('discount', e.target.value) }} />
                                                </div>
                                                <label for="basic-url" className="form-label mb-0">Общие количество товара</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder='Общие количество товара:' value={storeItems.model.quantity} id="quantity" onInput={(e) => { storeItems.setFormItem('quantity', e.target.value) }} />
                                                </div>
                                                <label for="basic-url" className="form-label mb-0">Загрузите фото</label>
                                                <div class="input-group mb-3">
                                                    <input type="file" class="form-control" id="photo" onChange={(e) => { storeItems.setFormItem('photo', e.target.files[0]) }} />
                                                </div>
                                                <button className="btn btn-success ">Обновить</button>
                                                <p className='mt-2 text-success'>{storeItems.notify}</p>
                                                <p className="mt-2 text-danger">{storeItems.error}</p>
                                            </form>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default All_items
