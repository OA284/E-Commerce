import { Link, NavLink, useNavigate } from "react-router-dom";
import logoPic from "./../../../src/assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { authContext } from './../../Contex/AuthContext';
import { cartContext } from './../../Contex/CartContext';

const Navbar = () => {
    const {token, setToken} = useContext(authContext);
    let navigate =  useNavigate();
    const {numOfItems, clearCart} = useContext(cartContext);

    function signOut(){
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
        clearCart();
    }

    return (
        <nav className="py-4 bg-slate-100">
            <div className="lg:w-[90%] mx-auto lg:flex lg:flex-wrap lg:justify-between lg:items-center">
                <div className="flex justify-center items-center">
                    <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-10">
                        <div className="logo">
                            <Link to="/">
                                <img src={logoPic} alt="site logo" className="text-center m-auto"/>
                            </Link>
                        </div>
                        
                        {token == null ?
                            (null) 
                        : 
                            (<div className="navLinks text-center">
                                <div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center gap-5">
                                    <ul className="lg:flex lg:flex-wrap lg:justify-center lg:items-center gap-5">
                                        <li className="mt-4 lg:mt-0">
                                            <NavLink to="/">Products</NavLink>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <NavLink to="/brand">Brands</NavLink>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <NavLink to="/category">Category</NavLink>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <NavLink to="/wishlist">Wish List</NavLink>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <NavLink to="/allorders">All Orders</NavLink>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <div>
                                                <NavLink to="/cart" className="relative">
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                    {numOfItems == 0 ? null : <> <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#17c41a] border-2 border-white rounded-lg -top-3 -end-3 dark:border-gray-900">{numOfItems}</div> </>}
                                                </NavLink>
                                            </div>
                                        </li>

                                        <li className="mt-4 lg:mt-0">
                                            <div>
                                                {numOfItems == 0 ?
                                                    null
                                                : 
                                                    <>
                                                        <Link
                                                        to="/checkout"
                                                        type="button" 
                                                        className="border-2 border-blue-700 text-black bg-transparent hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent font-medium rounded-lg text-sm px-3 py-1 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                                            <i className="fa-solid fa-money-bill"></i>
                                                        </Link>
                                                    </>
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>)
                        }
                    </div>
                </div>

                <div className="text-center mt-4 lg:mt-0">
                    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
                        <div>
                            {token == null ?
                                (<>
                                    <NavLink to="/login">Login</NavLink>
                                    <NavLink to="/register" className="ml-4">Register</NavLink>
                                </>) 
                            : 
                                (<button onClick={signOut}>Signout</button>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;