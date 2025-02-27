import { useFormik } from "formik"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from 'react';
import { authContext } from './../../Contex/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {setToken} = useContext(authContext);
    
    const user = {
        email:"",
        password:""
    }

    const validation = Yup.object().shape(
        {
            email:Yup.
                    string().
                    required("Mail is required").
                    email("Enter valid Email"),
                    
            password:Yup.
                        string().
                        required("Password is required").
                        matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/, "must containe letters, numbers and char ex: @ , _ , !")
        }
    )

    async function logInApi(values) {
        setIsLoading(true);
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
            toast.success(response?.data.message);
            setToken(response?.data.token)
            localStorage.setItem("token", response?.data.token);
            setIsLoading(false);
            navigate("/")
        } 
        catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues:user,
        onSubmit:logInApi,
        validationSchema:validation
    })

    return (
        <>
            <div className="py-5">
                <h1 className="mb-8 text-green-700 text-5xl font-bold text-center">LogIn Page</h1>
                
                <div className="md:w-[60%] mx-auto md:p-0 p-5">
                    <form className="flex flex-col items-end" onSubmit={formik.handleSubmit}>
                        {/* User e-mail */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            
                            <label 
                            htmlFor="email" 
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email address
                            </label>

                            {formik.errors.email && formik.touched.email? 
                                (<div className="flex items-center p-4 mb-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">ERROR!!!!</span> {formik.errors.email}
                                    </div>
                                </div>) : (null)}
                        </div>

                        {/* User password */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input 
                            name="password" 
                            type="password"
                            id="name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            
                            <label 
                            htmlFor="password" 
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>

                            {formik.errors.password && formik.touched.password? 
                                (<div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Danger</span>
                                    <div>
                                        <span className="font-medium">Ensure that these requirements are met:</span>
                                        <ul className="mt-1.5 list-disc list-inside">
                                            <li>{formik.errors.password}</li>
                                            <li>At least 3 characters (and up to 20 characters)</li>
                                            <li>At least one capital letter</li>
                                        </ul>
                                    </div>
                                </div>) : (null)}
                        </div>

                        <div className="flex flex-wrap justify-between items-center w-full">
                            {/* forget */}
                            <Link 
                            to="/forgetPassword"
                            className="border-2 border-[#0e9f6e] py-2 px-4 rounded-full hover:bg-[#0e9f6e] hover:text-white transition-all">
                                Forget Your Password ?
                            </Link>

                            {/* button */}
                            <button 
                                type="submet"
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    {isLoading == true ? <i className="fa-solid fa-spin fa-circle-notch text-white"></i> : "LogIn"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login