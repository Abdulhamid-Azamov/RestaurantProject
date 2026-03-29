"use client"
import { BasketBtn, LikeBtn } from '@/public/icons'
import Link from 'next/link'
import BadgeAction from './BadgeAction'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useLike } from '@/context/LikeContext'
import CartDrawer from './CartDrawer'
import LikeModal from './LikeModal'
import { LogoIcon } from '@/public/icons'

const NavBar = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [likeOpen, setLikeOpen] = useState(false)
    const { totalCount } = useCart()
    const { totalCount: likeCount } = useLike()
    const pathname = usePathname()

    const navList = [
        { title: "Меню", path: "/menu" },
        { title: "Новости", path: "/news" },
        { title: "Бронирование", path: "/booking" },
        { title: "О нас", path: "/about" },
        { title: "Контакты", path: "/contact" }
    ]

    return (
        <>
            <div className='flex items-center justify-between op-background mt-11 px-17 py-13 rounded-tl-[50px] rounded-tr-[50px]'>
                <Link href={"/"}>
                    <LogoIcon />
                </Link>
                <nav className="flex items-center gap-10">
                    {navList.map((item) => {
                        const isActive = pathname === item.path
                        return (
                            <Link key={item.title} href={item.path} className={`text-[18px] leading-[150%] duration-300 transition ${isActive ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
                <div className='flex gap-6.5'>
                    <BadgeAction
                        icon={<LikeBtn />}
                        count={likeCount}
                        onClick={() => setLikeOpen(true)}  // ✅
                    />
                    <BadgeAction
                        icon={<BasketBtn />}
                        count={totalCount}
                        onClick={() => setCartOpen(true)}
                    />
                </div>
            </div>
            <LikeModal isOpen={likeOpen} onClose={() => setLikeOpen(false)} />  {/* ✅ */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}

export default NavBar