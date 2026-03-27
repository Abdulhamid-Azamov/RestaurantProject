import { ToRight } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";


const MenuButton = ({ title, href = "#" ,extraClass}: MenuButtonType) => {
    return (
        <Link href={href} className={` ${extraClass} relative inline-flex items-center gap-4 bg-black text-white px-8 py-5 rounded-t-2xl rounded-bl-2xl font-bold text-lg overflow-hidden  active:scale-95 group `} >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            {title}
            <Image src={ToRight} alt='Right Icon' />
        </Link>
    );
};

export default MenuButton;
