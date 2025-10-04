import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";

import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/signUp";
import Secret from "../pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import UpdatedItems from "../pages/Dashboard/UpdatedItems/UpdatedItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/menu', 
          element: <Menu></Menu>
        },
        {
          path: '/order/:category',
          element: <Order></Order>
        },
        {
          path: '/secret',
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    // Dashboard layout
    {
      path:'Dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path:'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element:<Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },





        // admin only routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'addItems',
          element: <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path: 'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
          // element:<ManageItems></ManageItems>
        },
        {
          path: 'updatedItems/:id',
          element:<AdminRoute><UpdatedItems></UpdatedItems></AdminRoute>,
          loader: ({params})=>fetch(`https://bistro-boss-restaurant-server-side-theta.vercel.app/menu/${params.id}`)
        },
        {
          path:'bookings',
          element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
      ]
    }
    ,
    // User login and signUp
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/signUp',
      element: <SignUp></SignUp>
    },
  ]);