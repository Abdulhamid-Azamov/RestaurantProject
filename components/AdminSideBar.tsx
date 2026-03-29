import { Boxes, Cookie, LogOut, LucideHome, MessageCircle, User, UsersRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminSideBar = () => {
    const pathname = usePathname()


    const adminNav = [
        { title: "Dashboard", path: "/admin", icon: <LucideHome size={28} /> },
        { title: "Menu", path: "/admin/menu", icon: <Cookie size={28} /> },
        { title: "Users", path: "/admin/users", icon: <UsersRound size={28} /> },
        { title: "Zakaz", path: "/admin/order", icon: <Boxes size={28} /> },
        { title: "ContactInfo", path: "/admin/contact-info", icon: <MessageCircle size={28} /> },
    ]

    return (
        <div>
            <aside className="w-64 bg-white/30 backdrop-blur-md flex flex-col py-10 px-4 gap-2 fixed h-full border-r border-white/40 shadow-xl">
                <div className="flex flex-col items-center justify-center mb-10 gap-3">
                    <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                        <User color="white" size={28} />
                    </div>
                    <h1 className="text-[18px] font-black text-black">Admin Panel</h1>
                    <div className="w-full h-px bg-black/10" />
                </div>
                {adminNav.map(item => {
                    const isActive = pathname === item.path
                    return (
                        <Link key={item.path} href={item.path as any} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-[15px] font-medium ${isActive ? "bg-black text-white shadow-lg scale-[1.02]" : "hover:bg-white/50 text-black/70 hover:text-black"}`}   >
                            <span className="text-[20px]">{item.icon}</span>
                            <span className="text-[20px]">{item.title}</span>
                        </Link>
                    )
                })}
                <div className="mt-auto">
                    <div className="w-full h-px bg-black/10 mb-4" />
                    <Link href={'/'} className="flex items-center gap-3 px-4 py-3 rounded-2xl transition text-[15px] font-medium text-red-500 hover:bg-red-50 w-full cursor-pointer">
                        <span className="text-[20px]"><LogOut /></span>
                        <span>Chiqish</span>
                    </Link>
                </div>
            </aside>
        </div>
    )
}

export default AdminSideBar
