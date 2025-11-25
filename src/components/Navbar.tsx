import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <header className="bg-slate-800 border-b border-slate-700">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-xl font-semibold text-emerald-400">
                    World Map Dashboard
                </div>
                <div className="flex gap-6 text-lg">
                    <NavLink 
                        to="/"
                        className={({ isActive }) => 
                            isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white transition"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/map"
                        className={({ isActive }) => 
                            isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white transition"
                        }
                    >
                        Map
                    </NavLink>
                    <NavLink 
                        to="/about"
                        className={({ isActive }) => 
                            isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white transition"
                        }
                    >
                        About
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}