import Image from 'next/image';
import React from 'react';
import logo from "../assets/logo.png"
import Link from 'next/link';

const NavBar = () => {
    return (
        <div className='border-b'>
            <div className="container mx-auto navbar shadow-sm">
                <div></div>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Workouts</a></li>
                            <li><a>My Plan</a></li>
                        </ul>
                    </div>
                    <div className='flex justify-between gap-2'>

                        <Image src={logo} alt="Fit-logo"></Image>
                        <h1 className='font-bold text-2xl'>FITLOG</h1>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Workouts</a></li>
                        <li><a>My Plan</a></li>
                    </ul>
                </div>


                <div className="navbar-end gap-4">
                    <Link href="" className="flex items-center gap-2">
                        Plan
                        <span className="badge badge-sm text-black bg-[#C2F800]">10</span>
                    </Link>

                    <Link href="" className="flex items-center gap-2">
                        Saved
                        <span className="badge badge-sm">0</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NavBar;