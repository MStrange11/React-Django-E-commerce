import React, { useEffect, useState } from 'react'

import Orders from '../components/Orders'
import CreateAuthAxios from '../components/AxiosSetup'
import { useNavigate } from "react-router-dom";

import { Navbar } from '../components'

const MyOrder = () => {
    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        let axios = CreateAuthAxios()
        if (axios) {

            axios.get("orders/")
                .then((res) => {
                    setOrders(res.data)
                    console.log(res.data);

                })
                .catch((err) => {
                    console.log(err);

                })
        }
        else {
            navigate("/login");

        }
    }, [])

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: "center" }}>My Orders</h1>
            {orders.length > 0 ? <Orders orders={orders} /> : <h1>Zero order placed</h1>}

        </div>
    )
}

export default MyOrder
