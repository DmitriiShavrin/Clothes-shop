import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Change_banner.css';
import storeBanner from '../../../../store/storeBanner';


const Change_banner = observer(() => {

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
                            <h6 className="fw-bold inscription mb-2">Замена баннера</h6>
                            {/* FORM */}
                            <form action="" className="add_banner" onSubmit={(e) => { storeBanner.create(e) }}>

                                <label for="basic-url" className="form-label mb-0">Название баннера</label>
                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder='Введите название баннера:' id='title' onInput={(e) => { storeBanner.setFormBanner('title', e.target.value) }} />
                                </div>
                                <label for="basic-url" className="form-label mb-0">Background</label>
                                <div className="input-group w-25">
                                    <input type="color" className="form-control form-control-color" id="background" defaultValue="#bbbbbb" onChange={(e) => { storeBanner.setFormBanner('background', e.target.value) }} />
                                </div>

                                <label for="basic-url" className="form-label mb-0">Загрузите фото баннера</label>
                                <div className="input-group mb-3">
                                    <input type="file" claclassNamess="form-control" id="photo" onChange={(e) => { storeBanner.setFormBanner('photo', e.target.files[0]) }} />
                                </div>
                                <button className="btn btn-success ">Добавить</button>
                                <p className='mt-2 text-success'>{storeBanner.notify}</p>
                                <p className="mt-2 text-danger">{storeBanner.error}</p>
                                {
                                    storeBanner.img_min && storeBanner.img_show
                                        ?
                                        <div className="card card_s my-5">
                                            <div className="d-flex justify-content-between align-items-center pe-2 ps-2">
                                                <h3>Preview</h3>
                                                <button type="button" className="btn-close" aria-label="Close" onClick={() => { storeBanner.closeModal() }}></button>
                                            </div>
                                            <img src={storeBanner.img_min} className="card-img-top" alt="..." />
                                        </div>
                                        :
                                        null
                                }
                                <div className="list">
                                    <h6 className="fw-bold inscription">Все баннеры</h6>
                                    <ol className="list-group list-group-numbered">
                                        {!storeBanner.allBanners.length
                                            ?
                                            <p className="text-danger">Баннеры не созданы</p>
                                            :
                                            (
                                                storeBanner.allBanners.map((ban, idx) => (
                                                    < li className="list-group-item d-flex bd-highlight align-items-center" key={idx} style={{ backgroundColor: ban.background }}>
                                                        {ban.active ? <i className="fas fa-check text-warning ms-2"></i> : null}
                                                        <img src={`/img_banner/${ban.photo}`} alt="" width="100px" className="ms-2" />
                                                        <div className="me-auto bd-highlight ms-3">{ban.title}</div>
                                                        <div className="bd-highlight">
                                                            <button type="button" className="btn btn-success" onClick={() => { storeBanner.activate(ban._id) }}>Использовать</button>
                                                            <button type="button" className="btn btn-info ms-3" onClick={() => { storeBanner.openUpdate(ban) }}>Изменить</button>
                                                            <button type="button" className="btn btn-danger ms-3" onClick={() => { storeBanner.deleteBanner(ban._id) }}>Удалить</button>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        }
                                    </ol>
                                </div>
                            </form>

                            {storeBanner.edit_card_show
                                ?
                                <>
                                    <div className="edit_card">
                                        <div class="card card_s my-5">
                                            <div className="d-flex justify-content-between align-items-center pe-2 ps-2">
                                                <h3>Update banner</h3>
                                                <button type="button" class="btn-close" aria-label="Close" onClick={() => { storeBanner.closeUpdate() }}></button>
                                            </div>

                                            <form action="" className="add_category" onSubmit={(e) => { storeBanner.updateBanner(e, storeBanner.model._id) }}>
                                                <img src={storeBanner.img_min ? storeBanner.img_min : `/img/${storeBanner.model.photo}`} class="card-img-top" alt="..." />
                                                <label for="basic-url" class="form-label mb-0">Название</label>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" value={storeBanner.model.title} placeholder='Введите название:' id='title' onInput={(e) => { storeBanner.setFormBanner('title', e.target.value) }} />
                                                </div>
                                                <label for="basic-url" class="form-label mb-0">Background color</label>
                                                <div className="input-group ">
                                                    <input type="color" className="form-control form-control-color" id="background" value={storeBanner.model.background} onChange={(e) => { storeBanner.setFormBanner('background', e.target.value) }} />
                                                </div>
                                                <label for="basic-url" className="form-label mb-0">Загрузите фото</label>
                                                <div class="input-group mb-3">
                                                    <input type="file" class="form-control" id="photo" onChange={(e) => { storeBanner.setFormBanner('photo', e.target.files[0]) }} />
                                                </div>
                                                <button className="btn btn-success ">Обновить</button>
                                                <p className='mt-2 text-success'>{storeBanner.notify}</p>
                                                <p className="mt-2 text-danger">{storeBanner.error}</p>
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

export default Change_banner
