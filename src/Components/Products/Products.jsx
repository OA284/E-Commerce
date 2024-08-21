import axios from "axios";
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider1 from './HomeSlider1/HomeSlider1';
import HomeSlider2 from './HomeSlider2/HomeSlider2';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from "../../Contex/CartContext";
import toast from "react-hot-toast";
import { useState } from 'react';

const Products = () => {
    const {addProductToCart} = useContext(cartContext);

    const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return (storedWishlist ? JSON.parse(storedWishlist) : {})
    });

    async function getAllProducts(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    const {data, isLoading} = useQuery("product", getAllProducts);
    
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

    async function addToWishList(id){
        try {
            const data = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                {productId: id},
                { headers: { token: localStorage.getItem("token") } }
            )
            toast.success(data.data.message);
            setWishlist(prevWishlist => ({
                ...prevWishlist,
                [id]: true,
            }));
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            return data;
        } catch (error) {
            toast.error("error");
        }
    }

    async function removeFromWishList(id){
        try {
            const data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token: localStorage.getItem("token") } }
            )
            toast.success(data.data.message);
            setWishlist(prevWishlist => ({
                ...prevWishlist,
                [id]: false,
            }));
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            return data;
        } catch (error) {
            toast.error("error");
            
        }
    }

    if(isLoading){
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
            <section className="py-8">
                <div className="w-[95%] md:w-[90%] m-auto">
                    
                    <HomeSlider1/>

                    <HomeSlider2/>
                    
                    <div className="flex flex-wrap justify-center items-center">
                        {data?.data.data.map( (Product, idx)=> <>
                            <div key={idx} className="w-full sm:w-1/2 md:w-1/4 lg-w-1/6 p-4 group">
                                <div key={Product.id} className="inner p-3 hover:border-2 hover:border-green-600 hover:rounded-2xl hover:shadow-2xl transition-all duration-150">
                                    <Link to={`/ProductDetails/${Product.id}`}>
                                        <img src={Product.imageCover} alt="Product name" className="w-full"/>
                                        <h2 className="text-green-600 mt-3">{Product.category?.name}</h2>
                                        <h2 className="text-green-600 mt-3">{Product.title?.split(" ").slice(0, 2).join( )} ....</h2>

                                        <div className="flex flex-wrap justify-between items-center mt-3">
                                            <div>
                                                <h4>{Product.price} EGP</h4>
                                            </div>

                                            <div>
                                                <h4> <i className="fa-solid fa-star text-yellow-400 mr-2"></i> {Product.ratingsAverage}</h4>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="flex gap-4 justify-center items-center overflow-hidden">
                                        <button 
                                        onClick={ ()=> {addProduct(Product.id)}}
                                        type="button" 
                                        className="w-full translate-y-72 group-hover:translate-y-0 transition-all duration-150 mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                            ADD TO CART
                                        </button>

                                        <button onClick={() => (wishlist[Product.id] ? removeFromWishList(Product.id) : addToWishList(Product.id))}>
                                            {wishlist[Product.id] ? (
                                                <i className="fa-solid fa-heart text-red-500 fa-xl" onClick={() => removeFromWishList(Product.id)}></i>
                                            ) : (
                                                <i className="fa-solid fa-heart fa-xl"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </> )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products