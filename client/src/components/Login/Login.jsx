import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { observer } from 'mobx-react-lite';
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
                                    <form action="" className="form" onSubmit={(e) => StoreUsers.login(e)}>
                                        <p className="fw-bold">Авторизоваться</p>
                                        <div className="inputs">
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Электронная почта:' onInput={(e) => { StoreUsers.setFormLogin('email', e.target.value) }} />
                                            <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Пароль:' onInput={(e) => { StoreUsers.setFormLogin('pass', e.target.value) }}/>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-check">
                                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label fs-small " for="exampleCheck1">Запомнить меня</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="forget_pass">
                                                        <a href="" className="fs-small ">Забыли пароль</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button className="enter">Войти</button>
                                            </div>
                                            <p className="text-danger text-center">{StoreUsers.error}</p>
                                            <p className="text-success text-center">{StoreUsers.notify}</p>
                                        </div>
                                    </form>
                                    <div className="login_icons">
                                        <div className="d-flex justify-content-between">
                                            <div className="login_icon d-flex justify-content-center align-items-center">
                                                <i className="fab fa-facebook-f"></i>
                                            </div>
                                            <div className="login_icon d-flex justify-content-center align-items-center">
                                                <i className="fab fa-google"></i>
                                            </div>
                                            <div className="login_icon d-flex justify-content-center align-items-center">
                                                <i class="fab fa-vk"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hr">
                                        <hr />
                                    </div>
                                    <div className="login_second_part">
                                        <h6 className="fw-bold">Первый раз на нашем сайте?</h6>
                                        <h7>Зарегистрируйтесь в несколько кликов!</h7>
                                        <div className="text-center">
                                            <Link to="/register">
                                                <button className="register">Зарегистрироваться</button>
                                            </Link>
                                        </div>
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
