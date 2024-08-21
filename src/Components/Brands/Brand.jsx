import { useQuery } from 'react-query';
import axios from "axios";

const Brand = () => {
    async function getAllBrands(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }

    const {data} = useQuery("product", getAllBrands);

    console.log(data);
    
    return (
        <>
            <section className="py-8">
                <div className="w-[95%] md:w-[90%] m-auto">
                    <div className="flex flex-wrap justify-center items-center">
                        {data?.data.data.map( (Product, idx)=> <>
                            <div key={idx} className="w-full sm:w-1/2 md:w-1/4 lg-w-1/6 p-4 group">
                                <div key={Product.id} className="inner p-3 hover:border-2 hover:border-green-600 hover:rounded-2xl hover:shadow-2xl transition-all duration-150">
                                    <img src={Product.image} alt="" />
                                    <h1 className='text-center pt-3 pb-10'>{Product.name}</h1>
                                </div>
                            </div>
                        </> )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Brand