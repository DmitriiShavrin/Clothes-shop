import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_account.css';


const My_account = observer(() => {
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
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="right_part">Welcome to your account!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default My_account
