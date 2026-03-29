import { BoxesIcon, CookieIcon, MessageCircle, User } from 'lucide-react'
import { cookies } from 'next/headers'

const AdminHome = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const API_KEY = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${API_KEY}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    const stats = await res.json()

    return (
        <div>
            <h1 className="text-[32px] font-black mb-2">Dashboard</h1>
            <p className="text-black/50 mb-8">Xush kelibsiz, Admin! 👋</p>
            <div className="grid grid-cols-4 gap-6">
                {[
                    { title: "Foydalanuvchilar", count: stats.users, icon: <User size={40} />, from: "#3b82f6", to: "#1d4ed8" },
                    { title: "Taomlar", count: stats.menus, icon: <CookieIcon size={40} />, from: "#22c55e", to: "#15803d" },
                    { title: "Zakazlar", count: stats.order, icon: <BoxesIcon size={40} />, from: "#f59e0b", to: "#b45309" },
                    { title: "Xabarlar", count: stats.messages, icon: <MessageCircle size={40} />, from: "#ef4444", to: "#b91c1c" },
                ].map(item => (
                    <div key={item.title} className="text-white rounded-3xl p-6 shadow-lg" style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}>
                        <span className="text-[50px]">{item.icon}</span>
                        <p className="text-[36px] font-black mt-2">{item.count}</p>
                        <p className="text-[14px] opacity-80 mt-1">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHome