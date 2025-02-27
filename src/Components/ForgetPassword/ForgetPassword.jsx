import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)

    const user = {
        email:"",
    }

    async function sendCode(values) {
        setLoad(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            toast.success(data.message);
            navigate("/verifyCode")
            setLoad(false)
        } catch (error) {
            toast.error("error");
            setLoad(false)
        }
    }
    
    const formik = useFormik({
        initialValues:user,
        onSubmit:sendCode,
    })

    return (
        <>
            <div className="w-[95%] lg:w-[90%] mx-auto my-10 flex flex-col gap-10">
                <h1 className="text-4xl">Please enter your verification code :</h1> 

                <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                    {/* User e-mail */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        placeholder=" " 
                        value={formik.values.email}
                        onChange={formik.handleChange}/>
                        
                        <label 
                        htmlFor="email" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email address
                        </label>
                    </div>

                    {/* button */}
                    <button 
                        type="submet"
                        className="focus:outline-none text-black hover:text-white transition-all bg-transparent border-4 border-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            { load ? <i className="fa-solid fa-spin fa-circle-notch text-black hover:text-white"></i> : "Verify" }
                    </button>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword