import { Link } from "react-router-dom";

const NavBar = () => {

    const navOptions = <>

             <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/order/salad">Order Food</Link></li>

        {/* <li><a>Home</a></li>
        <li><a>Contact</a></li>
        <li><a>Dashboard</a></li>
        <li><a>Our Menu</a></li>
        <li><a>Our Shop</a></li> */}
    </>

    return (
        <>
            
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact text-black  dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <a className="  uppercase text-xl font-extrabold text-orange-500">Bistro Boss </a>
                        <span className="uppercase tracking-[4px]  ">Restaurant</span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={'/login'} className="btn animate-bounce bg-gradient-to-t from-orange-500 to-blue-600  outline-slate-800">Login</Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;