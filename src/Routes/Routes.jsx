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
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'cart',
          element: <Cart></Cart>
        }
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