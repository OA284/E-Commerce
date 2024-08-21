import { useContext } from "react"
import { Link } from 'react-router-dom';
import { cartContext } from './../../Contex/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";

const Checkout = () => {
    const {product, totalPrice, numOfItems, cartId, clearCart} = useContext(cartContext);
    const [city, setCity] = useState(null)
    const [phone, setPhone] = useState(null)
    const [details, setDetails] = useState(null)

    async function cashPayment(){
        const x = {
            shippingAddress:{
                details,
                phone,
                city
            }
        }

        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                x,
                {headers: {
                    token: localStorage.getItem("token"),
                }}
            )
            clearCart()
            toast.success(data.status)
            
        } catch (error) {
            toast.error("Error in cash payment")
        }
    }

    async function onlinePayment() {
        const x = {
            shippingAddress:{
                details,
                phone,
                city
            }
        }

        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                x,
                {headers: {
                    token: localStorage.getItem("token"),
                }}
            )
            clearCart()
            toast.success(data.status)
            window.open(data.session.url)

        } catch (error) {
            toast.error(data.data.message)
        }
    }

    return (
        <div className="w-[95%] md:w-[90%] mx-auto my-10">
            <h1 className="text-4xl mb-6">Checkout :</h1>
            
            <div className="details flex flex-col lg:flex-row gap-5 mb-10">
                <div className="info w-full lg:w-8/12 bg-slate-200 felx felx-col p-10">
                    
                    {/* User phone */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        onChange={ (e)=>{setPhone(e.target.value)} }
                        placeholder=" " />
                        
                        <label 
                        htmlFor="phone" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone number
                        </label>
                    </div>

                    {/* User details */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                        type="text" 
                        name="details" 
                        id="details" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        onChange={ (e)=>{setDetails(e.target.value)} }
                        placeholder=" " />
                        
                        <label 
                        htmlFor="details" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            details
                        </label>
                    </div>

                    {/* User city */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        onChange={ (e)=>{setCity(e.target.value)} }
                        placeholder=" " />
                        
                        <label 
                        htmlFor="phone" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            city
                        </label>
                    </div>
                </div>

                <div className="w-full lg:w-4/12 bg-slate-200 p-10">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-[#17c41a] text-2xl mb-5">SUMMERY</h2>
                        <Link to="/cart" className='text-[#17c41a] border-2 border-[#17c41a] px-2 rounded-xl mb-5'>EDIT CART</Link>
                    </div>

                    <div>
                        <div className='overflow-scroll h-[295px]'>
                            {product?.map( (item, idx) => <>
                                <div key={idx}>
                                    <div className='productData flex justify-between items-center border-b-2 border-gray-300 py-2 w-[95%]'>
                                        <div>
                                            <h3 className=''>{item.product.title.split(" ").splice(0, 2).join(" ")}</h3>
                                            <h3>QTY: {item.count}</h3>
                                            <h3>Price Per Item: {item.price} EGP</h3>
                                        </div>

                                        <div>
                                            <h2 className="mb-3 text-xl text-[#17c41a]">{item.price * item.count} EGP</h2>
                                        </div>
                                    </div>
                                </div>
                            </> )}
                        </div>

                        <div className='my-3'>
                            <div className='totalPrice flex justify-between items-center mb-2'>
                                <h1 className='text-xl font-mono text-[#17c41a]'>Total: </h1>
                                <h1 className='text-lg font-mono text-[#17c41a]'>{totalPrice} EGP</h1>
                            </div>

                            <div className='totalPrice flex justify-between items-center mb-2'>
                                <h1 className='text-xl font-mono text-[#17c41a]'>Delivery: </h1>
                                <h1 className='text-lg font-mono text-[#17c41a]'>20 EGP</h1>
                            </div>

                            <div className='totalPrice flex justify-between items-center mb-2'>
                                <h1 className='text-xl font-mono text-[#17c41a]'>Order Total: </h1>
                                <h1 className='text-lg font-mono text-[#17c41a]'>{totalPrice + 20} EGP</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='payment w-full bg-slate-200 felx felx-col p-10'>
                <h2 className="mb-5 text-2xl">2. <span className="text-[#17c41a]">PAYMENT :</span></h2>
                <div className='flex flex-col w-[80%] mx-auto'>
                    <Link to="/" onClick={cashPayment} className='border-2 border-[#17c41a] rounded-full text-center px-3 py-1 mt-3 hover:bg-[#17c41a] hover:text-white transition-all'>Pay In Cash</Link>
                    <Link onClick={onlinePayment} className='border-2 border-[#17c41a] rounded-full text-center px-3 py-1 mt-3 hover:bg-[#17c41a] hover:text-white transition-all'>Pay With Visa</Link>
                </div>
            </div>
        </div>
    )
}

export default Checkout