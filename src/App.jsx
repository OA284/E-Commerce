import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Categ from './Components/Categ/Categ';
import Brand from './Components/Brands/Brand';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './Contex/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/Products/ProductDetails/ProductDetails';
import CartContextProvider from './Contex/CartContext';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import WishList from './Components/WishList/WishList';

function App() {
  const newQueryClient = new QueryClient();

  const Application = createBrowserRouter([
    {path:"/", element:<Layout/>, children:[
      {path:"/", element:<ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:"/category", element:<ProtectedRoute> <Categ/> </ProtectedRoute>},
      {path:"/brand", element:<ProtectedRoute> <Brand/> </ProtectedRoute>},
      {path:"/ProductDetails/:id", element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:"/cart", element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:"/Checkout", element:<ProtectedRoute> <Checkout/> </ProtectedRoute>},
      {path:"/allorders", element:<ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path:"/wishlist", element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
      {path:"/login", element:<Login/>},
      {path:"/forgetpassword", element:<ForgetPassword/>},
      {path:"/resetpassword", element:<ResetPassword/>},
      {path:"/verifycode", element:<VerifyCode/>},
      {path:"*", element:<NotFound/>}
    ]}
  ]);

  return (
    <QueryClientProvider client={newQueryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <Toaster position="top-right"/>
          <RouterProvider router={Application}/>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
