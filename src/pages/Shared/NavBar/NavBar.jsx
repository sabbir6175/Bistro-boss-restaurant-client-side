import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FiShoppingCart } from "react-icons/fi";
import useCarts from "../../../hooks/useCarts";

const NavBar = () => {
  const { user, LogOut } = useContext(AuthContext);
  const [cart] = useCarts();
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        <Link to={"/dashboard/cart"}>
           <div className="flex gap-2 items-center ">
             <FiShoppingCart></FiShoppingCart>
              <div className="badge badge-sm badge-secondary">+{cart.length}</div>
           </div>
        </Link>
      </li>

      {/* <li><a>Home</a></li>
        <li><a>Contact</a></li>
        <li><a>Dashboard</a></li>
        <li><a>Our Menu</a></li>
        <li><a>Our Shop</a></li> */}
    </>
  );
  const handleLogOut = () => {
    LogOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className=" ">
        <div className="navbar fixed z-20 bg-opacity-30 backdrop-blur-2xl  bg-red-50 text-black md:px-16 ">
          <div className="navbar-start">
            <div className="dropdown ">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact text-black  dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>
            <div className="flex flex-col">
              <a className="  uppercase text-xl font-extrabold text-orange-500">
                Bistro Boss{" "}
              </a>
              <span className="uppercase tracking-[4px]  ">Restaurant</span>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full mr-2"
                  alt=""
                />
                <Link
                  to={"/"}
                  onClick={handleLogOut}
                  className="btn btn-md  outline-teal-100"
                >
                  logOut
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn ">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
