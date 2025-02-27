import axios from "axios";
import { toast } from 'react-hot-toast';
import { cartContext } from './../../Contex/CartContext';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';

const WishList = () => {
    const {addProductToCart} = useContext(cartContext);
    const [product, setProduct] = useState(null)
    const [isload, setIsLoad] = useState(false)

    async function showWishList() {
        setIsLoad(true)
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
                {headers: {token: localStorage.getItem("token")}}
            )
            setProduct(data?.data)
            setIsLoad(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoad(false)
        }
    }
    useEffect(() => {
        setIsLoad(true)
        showWishList();
        setIsLoad(false)
    }, [])
    

    async function removeFromWishList(id){
        try {
            const data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token: localStorage.getItem("token") } }
            )
            showWishList()
            toast.success(data.data.message);
            return data;
        } catch (error) {
            toast.error("error");
            
        }
    }

    async function addProduct(id){
        const data = await addProductToCart(id);
        console.log(data);
        if(data){
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
    }

    if(isload){
        return(
            <div className='h-screen flex flex-wrap justify-center items-center bg-gray-500'>
                <FallingLines 
                color="#fff" 
                width="100" 
                visible={true} 
                ariaLabel="falling-circles-loading" />
            </div>)
    }
    return(
        <>
            <div className="w-[95%] md:w-[90%] mx-auto">
                <div className="my-16 p-10 bg-slate-200">
                    <h1 className="font-mono font-semibold text-4xl">My Wish List</h1>
                    {product?.map( (item, idx)=>(<>
                        <div key={idx} className="flex flex-wrap justify-center items-center border-b-2 border-gray-300">
                            <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6 p-5">
                                <img src={item.imageCover} alt="Product Img" className="w-full"/>
                            </div>

                            <div className="w-full sm:w-2/4 md:w-3/5 lg:w-4/6 p-5">
                                <h2 className="font-mono text-xl">{item.title}</h2>
                                <h2 className="font-mono text-xl mt-3">{item.price} EGP</h2>
                                <button
                                    onClick={ ()=>{removeFromWishList(item.id)} }
                                    type="button" 
                                    className="mt-3 border-2 border-[#17c41a] text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                        <i className="fa-regular fa-trash-can text-[#17c41a]"></i> Remove
                                </button>
                            </div>

                            <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6 p-5">
                                <button 
                                    onClick={ ()=> {addProduct(item.id)}}
                                    type="button" 
                                    className="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                        ADD TO CART
                                </button>
                            </div>
                        </div>
                    </>))}
                </div>
            </div>
        </>
    )
}

export default WishList