import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './My_favorites.css';
import DataTable from 'react-data-table-component';
import storeCustomer from '../../../../store/storeCustomer';


const My_favorites = observer(() => {

    useEffect(() => {
        storeCustomer.getAllFavorites();
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
            name: 'Del',
            selector: (row) => <><button className="btn btn-danger">Del</button></>
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '50px', // override the row height
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

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
                                <div className="right_part">Избранные товары</div>
                            </div>
                            <h6 className="fw-bold inscription mb-4">Мои избранные</h6>
                            <DataTable
                                columns={columns}
                                data={storeCustomer.myFavorites}
                                pagination={true}
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                                fixedHeader
                                customStyles={customStyles}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default My_favorites
