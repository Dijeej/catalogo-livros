'use client'
import Link from "next/link";
import './index.scss'
import { GiWitchFlight } from "react-icons/gi";
import { useState } from "react";
// import { usePathname } from "next/navigation";
import { HiMiniBars4, HiMiniXCircle } from "react-icons/hi2";
import { IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";

export default function Navbar () {
    // const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
                <li>Início</li>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
            </ul>

            <button className="btn-profile" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >
              { isHovered ? <IoPersonCircleOutline /> : <IoPersonCircle />}
            </button>

            <button className='btn-drop-resp' onClick={toggleMenu}>
                {isOpen ? <HiMiniXCircle /> : <HiMiniBars4 />}
            </button>
        </nav>
       
    )
}