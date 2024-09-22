import React, { useState } from 'react'

const Order = ({ order, key }) => {
    const [showDes, setShowDes] = useState(-1)
    function show(k) {
        if (showDes === k) setShowDes(-1)
        else setShowDes(k)
    }
    return (
        <div
            className="order-box my-5 mx-auto bg-white shadow-lg rounded-lg p-6 max-w-4xl"
            key={key}
        >
            {/* Order Header */}
            <div className="head flex justify-between items-center border-b mb-4">
                <div className="text-lg font-semibold text-gray-800">
                    Order Date: {order.date}
                </div>
                <div className="text-lg font-semibold text-gray-600">
                    Total: <i class="fa-solid fa-indian-rupee-sign"></i>{order.netTotal}
                </div>
            </div>

            {/* Products in Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 pt-3">
                {order.products.map((product, k) => {
                    return (
                        <div
                            className="product-box my-2 bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
                            key={k}
                        >
                            {/* Product Content */}
                            <div
                                className="upper-box cursor-pointer p-4"
                                onClick={() => {
                                    show(k);
                                }}
                            >
                                <div className="image mb-3 left">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="title font-bold text-gray-800 mb-2">
                                    {product.title}
                                </div>
                                <div className="category text-sm text-gray-500 mb-1">
                                    Category: {product.category}
                                </div>
                                <div className="quantity text-lg font-semibold text-gray-800">
                                    Qty : {product.qty}
                                </div>
                                <div className="price text-lg font-semibold text-gray-800">
                                    Price : <i class="fa-solid fa-indian-rupee-sign"></i>{product.price*product.qty }
                                </div>
                            </div>

                            {/* Product Description (conditionally shown) */}
                            {showDes === k && (
                                <div className="description bg-gray-50 p-4 border-t mt-2">
                                    <div className="des text-sm text-gray-600">
                                        {product.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Order
