"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";

const links = [
    { label: "Workouts", href: "/" },
    { label: "My Plan", href: "/plan" },
];

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className="border-b border-[#222630] bg-[#15171D]">
            <div className="navbar container mx-auto shadow-sm">

                {/* Left: Logo + Mobile Menu */}
                <div className="navbar-start">

                    {/* Mobile dropdown */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                aria-label="Menu"
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
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-[#15171D] p-2 shadow"
                        >
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={
                                                isActive
                                                    ? "rounded-4xl border border-[#C2F800] bg-[#1A2312] text-[#C2F800] font-bold"
                                                    : "font-bold text-white hover:text-[#C2F800]"
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="FitLog logo"
                            className="h-8 w-auto"
                        />

                        <h1 className="text-2xl font-bold text-white">
                            FITLOG
                        </h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <div className="flex gap-3">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={
                                        isActive
                                            ? "btn rounded-4xl border border-[#C2F800] bg-[#1A2312] text-[#C2F800] font-bold"
                                            : "font-bold text-white hover:text-[#C2F800] px-4 py-2"
                                    }
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right */}
                <div className="navbar-end gap-4">
                    <Link
                        href="/plan"
                        className="flex items-center gap-2 text-white"
                    >
                        Plan
                        <span className="badge badge-sm bg-[#C2F800] text-black">
                            10
                        </span>
                    </Link>

                    <Link
                        href="/saved"
                        className="flex items-center gap-2 text-white"
                    >
                        Saved
                        <span className="badge badge-sm">0</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;