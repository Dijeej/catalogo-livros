import { NavItemT } from "@/types/navItem";
import Link from "next/link";
import './index.scss'

interface NavbarItemProps {
    navbarItem: NavItemT;
    isActive: boolean;
}



export default function NavItem({ navbarItem, isActive }: NavbarItemProps) {
    const {id, namePt, nameEn} = navbarItem;
    return (                
        <li value={id} className="navbar-item">   
            <Link href={`/${nameEn}`} 
            className={`navbar-link ${isActive? 'active' : ''}`}> 
            {namePt} 
            </Link>
        </li>
    );
}