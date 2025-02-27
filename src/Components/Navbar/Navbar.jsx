import { Link, NavLink, useNavigate } from "react-router-dom";
import logoPic from "./../../../src/assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { authContext } from './../../Contex/AuthContext';
import { cartContext } from './../../Contex/CartContext';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


function Navbar() {
  const { token, setToken } = useContext(authContext);
  let navigate = useNavigate();
  const { numOfItems, clearCart } = useContext(cartContext);

  function signOut() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
    clearCart();
  }

  return (
    <Disclosure as="nav" className="bg-[#f1f5f9]">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          
          {token == null ?
            (null)
            :
            (<>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md group hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </>)
          }
          
          {token == null ? 
            (<div className="flex items-center justify-start flex-1 sm:items-stretch sm:justify-start">
              <div className="flex items-center shrink-0">
                <div className="flex items-center shrink-0">
                  <div className="logo">
                    <Link to="/">
                      <img src={logoPic} alt="site logo" className="m-auto text-center" />
                    </Link>
                  </div>
                </div>
              </div>
  
              {token == null ?
                (null)
                :
                (<>
                  
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        <ul className="gap-5 lg:flex lg:flex-wrap lg:justify-center lg:items-center">
        
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
                                    className="px-3 py-1 text-sm font-medium text-black bg-transparent border-2 border-blue-700 rounded-lg hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                    <i className="fa-solid fa-money-bill"></i>
                                  </Link>
                                </>
                              }
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  
                </>)
              }
            </div>)
            : 
            (<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
              <div className="flex items-center shrink-0">
                <div className="flex items-center shrink-0">
                  <div className="logo">
                    <Link to="/">
                      <img src={logoPic} alt="site logo" className="m-auto text-center" />
                    </Link>
                  </div>
                </div>
              </div>
  
              {token == null ?
                (null)
                :
                (<>
                  
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        <ul className="gap-5 lg:flex lg:flex-wrap lg:justify-center lg:items-center">
        
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
                                    className="px-3 py-1 text-sm font-medium text-black bg-transparent border-2 border-blue-700 rounded-lg hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                                    <i className="fa-solid fa-money-bill"></i>
                                  </Link>
                                </>
                              }
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  
                </>)
              }
            </div>)
          }

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="-mt-4 text-center lg:mt-0">
              <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
                <div className="mt-4 text-center lg:mt-0">
                  <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
                    <div>
                      {token == null ?
                        (<>
                          <NavLink to="/login" className="px-2 py-1 border-2 border-black rounded-3xl">Login</NavLink>
                          <NavLink to="/register" className="px-2 py-1 ml-4 border-2 border-black rounded-2xl">Register</NavLink>
                        </>)
                        :
                        (<button onClick={signOut} className="px-2 py-1 ml-4 transform border-2 border-black rounded-2xl hover:bg-red-600 hover:text-white">Signout</button>)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="flex items-center justify-center px-2 pt-2 pb-3 space-y-1">
          <ul className="gap-5 lg:flex lg:flex-wrap lg:justify-center lg:items-center">

            <li className="mt-4 text-center lg:mt-0">
              <NavLink to="/">Products</NavLink>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <NavLink to="/brand">Brands</NavLink>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <NavLink to="/category">Category</NavLink>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <NavLink to="/wishlist">Wish List</NavLink>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <NavLink to="/allorders">All Orders</NavLink>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <div>
                <NavLink to="/cart" className="relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {numOfItems == 0 ? null : <> <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#17c41a] border-2 border-white rounded-lg -top-3 -end-3 dark:border-gray-900">{numOfItems}</div> </>}
                </NavLink>
              </div>
            </li>

            <li className="mt-4 text-center lg:mt-0">
              <div>
                {numOfItems == 0 ?
                  null
                  :
                  <>
                    <Link
                      to="/checkout"
                      type="button"
                      className="px-3 py-1 text-sm font-medium text-black bg-transparent border-2 border-blue-700 rounded-lg hover:bg-transparent focus:ring-4 focus:ring-tranbg-transparent dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-tranbg-transparent">
                      <i className="fa-solid fa-money-bill"></i>
                    </Link>
                  </>
                }
              </div>
            </li>
          </ul>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar;