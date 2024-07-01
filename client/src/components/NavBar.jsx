import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <>
            <header className="bg-gray-800 text-white p-8">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="logo">
                        <NavLink to="/" className="text-white no-underline text-xl font-bold">SDC - Student Tracking Portal</NavLink>
                    </div>
 
                    <nav>
                        <ul className="flex m-0 p-0 list-none">
                            <li className="ml-5">
                                <NavLink to="/register" className="text-white no-underlines">Register</NavLink>
                            </li>
                            <li className="ml-5">
                                <NavLink to="/login" className="text-white no-underlines">Login</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
