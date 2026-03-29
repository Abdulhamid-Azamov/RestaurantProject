"use client"
import { getUserFromToken, logoutApi } from "@/app/lib/service"
import CustomSelect from "@/components/CustomSelect"
import { User } from "@/public/icons"
import { Email, PhoneCall, RussianFlag, UsaFlag, UzbekFlag } from "@/public/images"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<{ username: string; role: string } | null>(null)
    const router = useRouter()

    const languages = [
        { id: 1, flag: RussianFlag, name: "Русский", alt: "Русский" },
        { id: 2, flag: UzbekFlag, name: "Uzbekcha", alt: "Uzbek Tili" },
        { id: 3, flag: UsaFlag, name: "Inglizcha", alt: "English language" }
    ]

    useEffect(() => {
        getUserFromToken().then((userData) => {
            if (userData) {
                setUser(userData)
            }
        })
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest('.relative')) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    const handleLogout = async () => {
        await logoutApi()
        setUser(null)
        setIsOpen(false)
        router.push('/login')
    }

    return (
        <div className="flex justify-between px-17.5 py-3.5">
            <div className="flex gap-6.75">
                <div className="flex items-center gap-3">
                    <Image src={PhoneCall} alt="Phone Call" className="icons" width={18} height={18} />
                    <a href="tel:+99890758383833">+998(90)758383833</a>
                </div>
                <div className="flex items-center gap-3">
                    <Image src={Email} alt="Phone Call" className="icons" width={19} height={16} />
                    <a href="#">azamovabdulkhamid@gmail.com</a>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-center gap-4">
                    <div className="min-w-35">
                        <CustomSelect languages={languages} />
                    </div>
                    {user ? (
                        <div className="relative">
                            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center gap-2 bg-black px-2 py-2 rounded-xl cursor-pointer">
                                <Image src={User} alt="User Img" width={18} height={18} />
                                <p className="text-white text-[12px] leading-[150%]">{user.username}</p>
                            </div>
                            {isOpen && (
                                <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-lg p-2 w-44 z-50">
                                    {user.role === 'admin' && (
                                        <Link href={'/admin'} className="block w-full text-left px-4 py-2 text-[14px] text-black hover:bg-gray-100 rounded-xl cursor-pointer transition">
                                            Open Admin Panel
                                        </Link>
                                    )}

                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition">
                                        Выйти из аккаунта
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href={"/login"} className="flex items-center justify-center gap-2 bg-black px-2 py-2 rounded-xl cursor-pointer hover:bg-gray-800 transition">
                            <Image src={User} alt="User Img" width={18} height={18} />
                            <p className="text-white text-[12px] leading-[150%]">Вход в аккаунт</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header