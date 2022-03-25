import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../../Navbar/Navbar';
import './Users.css';
import DataTable from 'react-data-table-component';
import storeUsers from '../../../../store/storeUsers';


const Users = observer(() => {

    let n = 1;

    let columns = [
        {
            name: '#',
            selector: (row) => <>{n++}</>
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Last name',
            selector: 'last_name',
            sortable: true,
            right: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            right: true,
        },
        {
            name: 'Block',
            selector: (row) => <><button className={`${row.block ? "btn btn-success" : "btn btn-danger"}`}
                onClick={() => {
                    if (row.block) {
                        storeUsers.unBlockUser(row._id)
                    } else {
                        storeUsers.blockUser(row._id)
                    }
                }}

            >{row.block ? 'Unblock' : 'Block'}</button></>
        },
        {
            name: 'Del',
            selector: (row) => <><button className="btn btn-danger" onClick={() => { storeUsers.deleteUser(row._id) }}>Delete</button></>
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
                            <div className="right_part">Все пользователи</div>
                            <DataTable
                                columns={columns}
                                data={storeUsers.allUsers}
                                pagination={true}
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                                fixedHeader
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Users
