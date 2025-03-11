'use client'
import Link from "next/link";
import './index.scss'
import { GiWitchFlight } from "react-icons/gi";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMiniBars4, HiMiniXCircle } from "react-icons/hi2";
import { IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";
import NavItem from "../NavItem";
import { NavItemT } from "@/types/navItem";
import { genreDic } from "@/utils/genreDic";

export default function Navbar () {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const navItens: NavItemT[] = Object.entries(genreDic).map(([id, { pt, en }]) => ({
        id: parseInt(id),
        namePt: pt,
        nameEn: en,
    }));

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <Link href="/" className="page-title"> 
                <GiWitchFlight className="page-icon" /> 
                <p className="page-text">Witch TV</p> 
            </Link>
            <ul className={`nav-itens ${isOpen ? 'open' : ''}`}> 
            <li className="nav-home">
                    <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href={'/'}>Início</Link>
                </li>

                {navItens.map((item) => (
                    <NavItem 
                    key={item.id} 
                    navbarItem={item} 
                    isActive={pathname === `/${item.nameEn}`}
                    />
                ))}
            </ul>

            <button className="btn-profile" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >
              { isHovered ? <IoPersonCircle /> : <IoPersonCircleOutline /> }
            </button>

            <button className='btn-drop-resp' onClick={toggleMenu}>
                {isOpen ? <HiMiniXCircle /> : <HiMiniBars4 />}
            </button>
        </nav>
       
    )
}