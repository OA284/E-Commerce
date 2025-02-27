import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from "react-hot-toast";
import { FallingLines } from 'react-loader-spinner';

const AllOrders = () => {
    const {id} = jwtDecode(localStorage.getItem("token"))
    
    const [load, setLoad] = useState(false)
    const [allOrder, setAllOrder] = useState(null)

    async function getAllOrders(){
        setLoad(true);
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            console.log(data);
            setAllOrder(data);
            setLoad(false);
        } catch (error) {
            toast.error(error);
            setLoad(false);
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])
    
    if(load){
        return(
            <div className='h-screen flex flex-wrap justify-center items-center bg-gray-500'>
                <FallingLines 
                color="#fff" 
                width="100" 
                visible={true} 
                ariaLabel="falling-circles-loading" />
            </div>)
    }
    return (
        <>
            <section className='py-10'>
                <div className='w-full md:w-[80%] mx-auto'>
                    {allOrder?
                        allOrder.map( (order, idx)=>(
                            <div key={idx}>
                                <div className='p-5 mb-3 bg-slate-200'>
                                    <div className='flex flex-wrap justify-center items-center'>
                                        {order.cartItems?.map( 
                                            function(item, idx){
                                                return <div key={idx} className='w-1/6'>
                                                    <img src={item.product.imageCover} alt="" className='w-full px-2'/>
                                                </div>
                                            })
                                        }
                                    </div>
                                    <h2>Total Order Price: {order.totalOrderPrice} EGP</h2>
                                    <h2>Payment Method: {order.paymentMethodType}</h2>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
            </section>
        </>
    )
}

export default AllOrders