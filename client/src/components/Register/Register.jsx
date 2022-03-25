import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { observer } from 'mobx-react-lite'
import StoreUsers from '../../store/storeUsers';

const Login = observer(() => {
    return (
        <>
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 right_column">
                            <div className="login_right_part">
                                <div className="login_heading">
                                    <h7><i className="fas fa-arrow-left"></i> <Link to="/">Назад на главную</Link></h7>
                                </div>
                                <div className="container_two">
                                    <form action="" className="form" onSubmit={(e) => StoreUsers.register(e)}>
                                        <p className="fw-bold">Зарегистрироваться</p>
                                        <h7 className="register_warning">Kiabi обязуется не передавать персональные данные третьим лицам.</h7>
                                        <div className="inputs">
                                            <div className="radios d-flex">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="мужщина" onInput={(e) => { StoreUsers.setFormRegister('gender', e.target.value) }} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Мужской
                                                    </label>
                                                </div>
                                                <div class="form-check ms-4">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked value="женщина" onInput={(e) => { StoreUsers.setFormRegister('gender', e.target.value) }} />
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Женский
                                                    </label>
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Фамилия:' onInput={(e) => { StoreUsers.setFormRegister('last_name', e.target.value) }} />
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Имя:' onInput={(e) => { StoreUsers.setFormRegister('name', e.target.value) }} />
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Отчество:' onInput={(e) => { StoreUsers.setFormRegister('paternal', e.target.value) }} />
                                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Дата рождения:' onInput={(e) => { StoreUsers.setFormRegister('birth', e.target.value) }} />
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Электронный адрес:' onInput={(e) => { StoreUsers.setFormRegister('email', e.target.value) }} />
                                            <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Пароль:' onInput={(e) => { StoreUsers.setFormRegister('pass', e.target.value) }} />
                                            <div className="form-check">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onInput={(e) => { StoreUsers.setFormRegister('subscribtion', e.target.value) }} />
                                                <label className="form-check-label fs-small " for="exampleCheck1" >Подписаться на рассылку</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onInput={(e) => { StoreUsers.setFormRegister('messages', e.target.value) }} />
                                                <label className="form-check-label fs-small " for="exampleCheck1">Я хочу получать смс-сообщения</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onInput={(e) => { StoreUsers.setFormRegister('validation', e.target.value) }} />
                                                <label className="form-check-label fs-small " for="exampleCheck1">Я даю свое согласие на обработку моих персональных данных ООО «Керуска» *</label>
                                            </div>
                                            <div className="hr">
                                                <hr />
                                            </div>
                                            <div className="text-center">
                                                <button className="enter">Подтвердить</button>
                                            </div>
                                            <p className="text-danger text-center">{StoreUsers.error}</p>
                                            <p className="text-success text-center">{StoreUsers.notify}</p>
                                        </div>
                                    </form>
                                    <div className="login_second_part">
                                        <p className="rights text-center">Данный сайт защищен reCAPTCHA. Правила конфиденциальности и Применяются условия использования Google.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Login
