import { useState } from "react";

const UserListPage = () => {
    const [users, setUsers] = useState([
        {
            name: "Wiz Khalifa",
            address: "USA",
            email: "wiz@gmail.com",
            phone: 29839283394,
        },

        {
            name: "Samir Ghising",
            address: "Lalitpur",
            email: "vten@gmail.com",
            phone: 98239283394,
        },

        {
            name: "Aashish Rana",
            address: "PokhreliMob",
            email: "laure@gmail.com",
            phone: 98639283394,
        }
    ])
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Static Navigation</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Static Navigation</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                        <table className=" table table-bordered table-sm table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    users && users.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1} </td>
                                            <td>{data.name} </td>
                                            <td>{data.address} </td>
                                            <td>{data.email} </td>
                                            <td>{data.phone} </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card mb-4"><div className="card-body">When scrolling, the navigation stays at the top of the page. This is the end of the static navigation demo.</div></div>
            </div>

        </>
    )
}

export default UserListPage;