import { useContext } from "react"
import { cartContext } from "../../Contex/CartContext"
import { Link } from 'react-router-dom';

const Cart = () => {
    const {product, totalPrice, updateProduct, deleteProduct, numOfItems, clearCart, load} = useContext(cartContext);
    console.log(product, "cart");
    
    return (
        <>
            <section className="py-8">
                <div className="w-[95%] mx-auto bg-slate-200 p-5">
                    
                    <h1 className="text-black text-5xl font-mono pb-3">Shop Cart:</h1>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            <h2 className="text-[#17c41a] font-mono text-2xl">Total Price: {totalPrice} EGP</h2>
                            <h2 className="text-[#17c41a] font-mono text-2xl">Total Products: {numOfItems}</h2>
                        </div>

                        {numOfItems == 0?
                            null
                        : 
                            <div>
                                <button
                                onClick={ ()=>{clearCart()} }
                                type="button" 
                                className="border-2 border-red-700 text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-3 py-1 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                    <i className="fa-regular fa-trash-can text-red-700"></i> Clear Cart
                                </button>
                            </div>
                        }
                    </div>
                    
                    <div className="mb-5">
                        {product?.map( (item, idx) => <>
                            <div key={idx} className="flex flex-wrap justify-center items-center border-b-2 border-gray-300">
                                <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6 p-5">
                                    <img src={item.product.imageCover} alt="product img" className="w-full"/>
                                </div>

                                <div className="w-full sm:w-2/4 md:w-3/5 lg:w-4/6 p-5">
                                    <h2 className="mb-3 text-xl">{item.product.title} .</h2>
                                    <h2 className="mb-3 text-xl text-[#17c41a]">Item Total Price : {item.price * item.count} EGP</h2>
                                    <h2 className="mb-3 text-xl text-[#17c41a]">Price Per Item : {item.price} EGP</h2>
                                    <button
                                        onClick={ ()=>{deleteProduct(item.product.id)} }
                                        type="button" 
                                        className="border-2 border-[#17c41a] text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                            <i className="fa-regular fa-trash-can text-[#17c41a]"></i> Remove
                                    </button>
                                </div>

                                <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6 p-5">
                                    <div className="flex justify-between items-center">
                                        <button
                                        name="addutton"
                                        value="addutton"
                                        onClick={ ()=>{ updateProduct(item.product.id, item.count+1) } }
                                        type="button" 
                                        className="border-2 border-[#17c41a] text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-3 py-1 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                                {load ? <i className="fa-solid fa-spin fa-circle-notch"></i> : <i className="fa-solid fa-plus"></i>}
                                        </button>
                                    
                                        <h2 className="mx-4">
                                            {item.count}
                                        </h2>
                                    
                                        <button
                                        onClick={ item.count == 1  ? ()=>{deleteProduct(item.product.id)} : ()=>{updateProduct(item.product.id, item.count-1)}}
                                        type="button" 
                                        className="border-2 border-[#17c41a] text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-3 py-1 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                            {load ? <i className="fa-solid fa-spin fa-circle-notch"></i> : <i className="fa-solid fa-minus"></i>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </> )}
                    </div>

                    {numOfItems == 0 ?
                        null
                    : 
                        <>
                            <Link
                                to="/checkout"
                                type="button" 
                                className="border-2 border-blue-700 text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-3 py-1 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                    <i className="fa-solid fa-cash-register"></i> proceed to payment
                            </Link>
                        </>}
                </div>
            </section>
        </>
    )
}

export default Cart