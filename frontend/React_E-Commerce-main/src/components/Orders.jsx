import React, { useState } from 'react'

import Order from './Order';

const Orders = ({ orders }) => {
    
    return (
        <div className="order-section space-y-8 px-4 py-6 bg-gray-100">
            {orders.map((order, i) => {
                return (
                    <Order order={order} key={i}/>
                );
            })}
        </div>

    )
}

export default Orders
