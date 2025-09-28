import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { CiLogout, CiMenuFries } from "react-icons/ci";
import useCarts from "../../../hooks/useCarts";

const NavBar = () => {
  const { user, LogOut } = useContext(AuthContext);
  const [cart] = useCarts();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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
          <div className="navbar-start ">
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
                {/* <img
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
                </Link> */}
                {/* user account */}
                <div className="flex items-center gap-[15px]">
                  <div
                    className="flex items-center gap-[10px] cursor-pointer relative"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <div className="relative">
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-[35px] h-[35px] rounded-full object-cover"
                      />
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                    </div>

                    <h1 className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600 sm:block hidden">
                      {user.displayName}
                    </h1>

                    <div
                      className={`${
                        accountMenuOpen
                          ? "translate-y-0 opacity-100 z-[1]"
                          : "translate-y-[10px] opacity-0 z-[-1]"
                      } bg-white w-max rounded-md absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                    >
                      <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
                        <FiUser />
                        View Profile
                      </p>

                      <div className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
                        <Link
                          to={"/"}
                          onClick={handleLogOut}
                          className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50"
                        >
                          <CiLogout />
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
