import React from 'react';
import './Footer.css';
import {observer} from 'mobx-react-lite';

const Footer = observer(() => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="col-lg-12 col-md-6 col-sm-12">
                        <div className="footer-info text-center">
                            There should be footer's data :P
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Footer
