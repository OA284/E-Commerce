import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FallingLines } from 'react-loader-spinner';
import { useContext, useState } from "react";
import { cartContext } from './../../../Contex/CartContext';
import toast from "react-hot-toast";

const ProductDetails = () => {
    const {id} = useParams();
    const {addProductToCart} = useContext(cartContext);

    const [load, setLoad] = useState(false);

    async function getProduct(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    const {data, isLoading} = useQuery(`Product-${id}`, getProduct);

    async function addProduct(){
        setLoad(true);
        const data = await addProductToCart(id);
        console.log(data);
        if(data){
            toast.success(data.message)
            setLoad(false);
        }
        else{
            toast.error(data.message)
            setLoad(false);
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
        <section className="py-8">
            <div className="w-full md:w-[80%] mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="md:w-1/3 w-full p-5">
                        <div className="inner">
                            <img src={data?.data.data.imageCover} alt="product img" className="w-full"/>
                        </div>
                    </div>

                    <div className="md:w-2/3 w-full p-5">
                        <div>
                            <h2 className="text-2xl mb-3 font-semibold">{data?.data.data.title}</h2>
                            <p className="text-xl mb-3">{data?.data.data.description} .</p>
                            <h2 className="text-xl text-green-700 mb-3 font-mono">{data?.data.data.category.name}</h2>

                            <div className="flex flex-wrap justify-between items-center mt-3">
                                <div>
                                    <h4>{data?.data.data.price} EGP</h4>
                                </div>

                                <div>
                                    <h4> <i className="fa-solid fa-star text-yellow-400 mr-2"></i> {data?.data.data.ratingsAverage}</h4>
                                </div>
                            </div>

                            <button
                                onClick={addProduct}
                                type="button" 
                                className="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                    {load ? <i className="fa-solid fa-spin fa-circle-notch"></i> : "ADD TO CART"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails